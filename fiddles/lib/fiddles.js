
var path = require('path'),
  fs = require('fs'),
  findit = require('findit'),
  ngist = require('ngist'),
  helpers = require('./fiddles/helpers'),
  console = require('./fiddles/logger'),
  error = helpers.error,
  tmpl = helpers.tmpl,
  mkdirp = helpers.mkdirp;

// ## steps
//
// This file defines a few generation function, one for each main generation step:
//
// * parse
// * generate
// * replace
// * gist

// ### parse
// Synchronous call, returns an array of exercises files to process.  Each of
// these include a list of fiddles to create, parsed from markdown content.
// Includes information about:
//
// * file: filepath
// * title: parsed from h3 element
// * details: long description about the exercises, the content of the whole
// exercises paragraph.
// * html: relative (from config.code) path to the html
// file (match fiddle.html in fiddles).
// * js: relative (from config.code) path to the js
// file (match fiddle.js in fiddles).
//
// first step: build meta from markdown content
// todo: move regex creation outside of iteration
//
var parse = exports.parse = function parse(config) {
  return findit.findSync(config.content)
    .filter(function(file) {
      if(!fs.statSync(file).isFile()) return false;
      return /exercises.md$/.test(file);
    })
    .map(function(file) {
      var content = fs.readFileSync(path.join(file), 'utf8'),
        titles = content.match(/###\s?.+/gm),
        exercises = content.split(/###\s?.+/gm).slice(1);

      titles = titles.map(function(title) {
        return title.replace(/###/, '').trim();
      });

      return exercises.map(function(part, i) {
        var html = part.match(/Open the file\s?\n?`([^`]+)`/).slice(1),
          js = part.match(/Use the file\s?\n?`([^`]+)`/).slice(1);

        return {
          file: file,
          title: titles[i],
          gistTitle: titles[i].toLowerCase().replace(/\s/g, '-'),
          details: part,
          html: html[0],
          js: js[0]
        };
      });
    });
};

// ### generate
// second step: fir each markdown exercises files, and each fiddles parsed from
// their markdown content, generates jsfiddle-gist ready folder.  It'll
// generate a `fiddle.js`, `fiddle.css`, `fiddle.html` and `fiddle.manifest`
// file.
//
// * The html file is matching the fiddle.html property (default to `Use the
// file path/to/file.html`).  * The css file is generated based on the link
// import of html files. Their content is concatenated and used as `fiddle.css`
// file content.  matching the fiddle.html property (default to `Use the file
// path/to/file.html`).  * The js file is matching the fiddle.js property
// (default to `Open the file path/to/file.js`).  * The manifest file is the
// result of running lib/fiddles/fiddle.manifest against few sensitive values
// (name, description, details)
//
var generate = exports.generate = function generate(files, config, gh, cb) {
  var remaining = 0;
  mkdirp(config.fiddles, function(err) {
    if(err) return error(err);

    files.forEach(function(file) {

      file.forEach(function(fiddle) {

        remaining++;

        console.info('Creating fiddle from file: ', fiddle);

        fiddle.js = config.solution ? fiddle.js.replace(/exercises\/js/, 'solutions') : fiddle.js;

        var js = fs.readFileSync(path.join(config.code, fiddle.js), 'utf8'),
          html = fs.readFileSync(path.join(config.code, fiddle.html), 'utf8'),
          title = fiddle.gistTitle,
          fiddlePath = path.join(config.fiddles, title),
          details = tmpl(config.manifest, {
            name: fiddle.file.split('/').slice(-1),
            description: fiddle.title,
            details: fiddle.details
          });

        // removes CSS link tags from the demo.html
        var css = [];
        html = html.replace(/<link\shref="([^"]+)".+>/gm, function(w, href) {
          var cssPath = path.join(config.code, path.dirname(fiddle.html), href);
          css.push(fs.readFileSync(cssPath, 'utf8'));
          return '';
        });

        // remove script import of jquery, will use jsFiddles fwk
        html = html.replace(/<script src="libs\/jquery-1.5.0.js.+/gm, '');

        // finally, deal with inline img references
        // todo: replace in CSS files too (though there's no img references in styles for now)
        html = html.replace(/<img\s*src="([^"]+)"/gm, function(m, src) {
          return '<img src="' + config.host + path.join(config.assets, src) + '"';
        });

        mkdirp(fiddlePath, function() {
          if(err) return error(err);

          var pkg = {
            name: fiddle.title,
            version: '0.0.1'
          };

          // Create demo.* files
          fs.writeFileSync(path.join(fiddlePath, 'fiddle.js'), js);
          fs.writeFileSync(path.join(fiddlePath, 'fiddle.html'), html);
          fs.writeFileSync(path.join(fiddlePath, 'fiddle.details'), details);
          fs.writeFileSync(path.join(fiddlePath, 'fiddle.css'), css.join('\n\n'));
          console.debug('Files generated at', fiddlePath);
          console.debug('Now creating gist for', fiddlePath);

          // `config.gists` is set to true, generate new gists and writes a package.json
          // file within each of gists' folder, with the gist id in `config.id`
          if(config.gists) return gist(fiddlePath, gh, function(err, id) {
            if(err) return error(err);

            pkg.config = {id: id};
            fs.writeFile(path.join(fiddlePath, 'package.json'), JSON.stringify(pkg, null, 2), function(err) {
              if(err) return error(err);
              if(--remaining) return;
              cb();
            });
          });

          // otherwise, if `config.gists` is set to false, creates the package.json file with dummy id, and bypass
          // the gists creation.
          pkg.config = { id: 'dummy' };
          return fs.writeFile(path.join(fiddlePath, 'package.json'), JSON.stringify(pkg, null, 2), function(err) {
            if(err) return error(err);
            if(--remaining) return;
            cb();
          });
        });
      });
    });
  });
};

// ### replace
//
// `third step`: go back in output folder and append the corresponding jsFiddle
// link. These should match the gists prepared folders in code/fiddles.
//
// Most likely, the nanoc build should have been run before.
//
var replace = exports.replace = function replace(files, config, cb) {

  var remaining = files.length;
  files.forEach(function(fiddles) {

    var folder = fiddles[0].file.replace(path.extname(fiddles[0].file), '')
      .replace(config.content, config.output);

    var content = fiddles.reduce(function(memo, fiddle) {

      // fiddle.file match the path of the markdown file
      var content = memo || fs.readFileSync(path.join(folder, 'index.html'), 'utf8'),
        pkg = JSON.parse(fs.readFileSync(path.join(config.fiddles, fiddle.gistTitle, 'package.json'), 'utf8'));

      var id = fiddle.title.toLowerCase().replace(/\s/g, '-'),
        fragment = '<h3 id="' + id + '">' + fiddle.title + '</h3>',
        match = content.match(new RegExp(fragment, 'gim'));

      if(!match) return --remaining;

      console.debug('Update', fiddle.title, 'with the jsFiddle urls', fragment);

      content = content.replace(fragment, function(match, title) {
        var url = tmpl(config.fiddle, {
          framework: 'jquery',
          version: 'edge',
          // todo, create gists, grab gists id from ngist callback
          gistid: pkg.config.id
        });

        console.debug('» ', url);
        return match + '\n\n<p><a href=":url">:content</a></p> \n\n<script src="https://gist.github.com/:gistid.js"> </script>'
          .replace(':url', url)
          .replace(':content', 'http://gist.github.com/' + pkg.config.id)
          .replace(':gistid', pkg.config.id);
      });

      console.info('Replacing ', path.join(folder, 'index.html'), '\n');
      return content;
    }, '');

    fs.writeFile(path.join(folder, 'index.html'), content, function(err) {
      if(err) return error(err);
      console.log('Replaced ', path.join(folder, 'index.html'));
      if(--remaining) return;
      cb();
    });
  });
};

// ### gist
//
// Use the [ngist](https://github.com/chapel/ngist) module to create new
// gist from the dirname provided.
var gist = exports.gist = function gist(dirname, gh, cb) {

  var files = fs.readdirSync(dirname).filter(function(file) {
    console.log(file);
    return /^fiddle\./.test(path.basename(file))
  }).map(path.join.bind({}, dirname));

  var options = {
    user: gh.user,
    token: gh.token,
    description: 'This is an example gist',
    private: true
  };


  ngist.files(files, function(err, processed_files) {
    if(err) return cb(err);
    ngist.send(processed_files, options, function(err, url) {
      if(err) return cb(err);
      console.log('Gist:', url);
      return cb(null, url.match(/gist.github.com\/(.+)/)[1]);
    });
  });
};
