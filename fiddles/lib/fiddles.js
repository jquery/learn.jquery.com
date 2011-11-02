//
// * first step - parse markdown content and search for:
//    * files ending with `exercises.md`
//    * Build meta informations for each exercises parsed from markdown
//    content, searching for `Open the file`, `Use the file`, 'You task is
//    to' patterns.
// * second step - use the generated meta descriptions for each exercises
// and generate the prepared demo folders, probably in codes/fiddles
// * third step - add a link on each markdown file (or in the html
// files output after the main build, probably better to not touch
// markdown files.

var fs = require('fs'),
  path = require('path'),
  util = require('util'),
  exec = require('child_process').exec,
  findit = require('findit');

// very simple options parsing for exercises/solutions switch (may opt
// for a real options parser if the config gets bigger).

var argv = process.argv.slice(2),
  solution = !!~['s', 'sol', 'solution'].indexOf(argv[0]);

// some configs
var config = {
  code: path.join(__dirname, '..', 'code'),
  fiddles: path.join(__dirname, '..', 'code', 'fiddles'),
  content: path.join(__dirname, '..', 'content'),
  output: path.join(__dirname, '..', 'content'),
  detailsTmpl: fs.readFileSync(path.join(__dirname, 'details.tmpl'), 'utf8'),
  fiddle: 'http://jsfiddle.net/gh/get/{framework}/{version}/{user}/{repo}/{tree}'
};

console.log('About to generate or update code/fiddles folders. Configuration:');
inspect(config);

if(solution) console.log('\nGeneration using solution mode, demo.js files will include solutions to exercises.\n');


return;


// first step: build meta from markdown content
// todo: move regex creation outside of iteration
var files = findit.findSync(config.content)
  .filter(function(file) {
    return /exercises\.md$/.test(file);
  })
  .map(function(file) {
    var content = fs.readFileSync(file, 'utf8'),
      titles = content.match(/###\s?.+\s-/gm) || content.match(/###\s?.+/gm) || [],
      exercises = content.split(/###\s?.+/gm).slice(1);

    titles = titles.map(function(title) {
      return title.replace(' -', '').replace(/###/, '').trim();
    });

    return exercises.map(function(part, i) {
      var html = part.match(/Open the file\s?\n?`([^`]+)`/).slice(1),
        js = part.match(/Use the file\s?\n?`([^`]+)`/).slice(1);

      return {
        file: file,
        title: titles[i],
        details: part,
        html: html[0],
        js: js[0]
      };
    });
  });

// second step: generate fiddles from meta info
mkdirp(config.fiddles, function(err) {
  if(err) return error(err);
  files.forEach(function(file) {
    file.forEach(function(fiddle) {
      console.log('\nCreating fiddle from file: ', fiddle.file);
      console.log('  » with demo.js: ', fiddle.js);
      console.log('  » with demo.html: ', fiddle.html);

      fiddle.js = solution ? fiddle.js.replace(/exercises\/js/, 'solutions') : fiddle.js;

      // files path are relative to code/ folder
      var js = fs.readFileSync(path.join(config.code, fiddle.js), 'utf8'),
        html = fs.readFileSync(path.join(config.code, fiddle.html), 'utf8'),
        title = fiddle.title.toLowerCase().replace(/\s/g, '-'),
        fiddlePath = path.join(config.fiddles, title),
        details = tmpl(config.detailsTmpl, {
          name: fiddle.file.split('/').slice(-1),
          description: fiddle.title,
          details: fiddle.details
        });

      // handle CSS references, concat them to create the demo.css files,
      // and remove CSS link tags from the demo.html
      var css = [];
      html = html.replace(/<link\shref="([^"]+)".+>/gm, function(w, href) {
        var cssPath = path.join(config.code, path.dirname(fiddle.html), href);
        css.push(fs.readFileSync(cssPath, 'utf8'));
        return '';
      });

      // remove script import of jquery, will use jsFiddles fwk
      html = html.replace(/<script src="libs\/jquery-1.5.0.js.+/gm, '');

      // finally, deal with inline img references
      html = html.replace(/<img\s*src="([^"]+)"/gm, function(m, src) {
        return '<img src="b64"'.replace('b64', b64(path.join(config.code, path.dirname(fiddle.html), src)));
      });

      mkdirp(fiddlePath, function() {
        if(err) return error(err);
        // Create demo.* files
        fs.writeFileSync(path.join(fiddlePath, 'demo.js'), js);
        fs.writeFileSync(path.join(fiddlePath, 'demo.html'), html);
        fs.writeFileSync(path.join(fiddlePath, 'demo.details'), details);
        fs.writeFileSync(path.join(fiddlePath, 'demo.css'), css.join('\n\n'));
      });
    });
  });
});

// third step: go back in content folder and append the corresponding
// jsFiddle link. These should match the demos prepared folders in
// code/fiddles.
files.forEach(function(fiddles) {
  fiddles.forEach(function (fiddle) {

    var content = fs.readFileSync(fiddle.file, 'utf8');

    console.log('\nUpdate', fiddle.title, 'with the jsFiddle urls');
    content = content.replace(/###\s?(.+)/gm, function(match, title) {
      var url = tmpl(config.fiddle, {
        framework: 'jquery',
        version: 'edge',
        user: 'mklabs',
        repo: 'web-learn-jquery-com',
        tree: 'tree/fiddles/code/fiddles/' + title.replace(/\s-.+/, '').toLowerCase().replace(/\s/g, '-') + '/'
      });

      if(/jsFiddle/.test(match)) {
        return match.replace(/\[[^\]]+]\(.[^)]+\)/, function() {
          return '[jsFiddle](:url)'.replace(':url', url);
        });
      }

      console.log('  » ', url);
      return match + ' - [jsFiddle](:url)'.replace(':url', url);
    });

    fs.writeFileSync(fiddle.file, content);
  });
});


// ### helpers
function inspect(data) {
  process.stdout.write(util.inspect(data, false, 4, true) + '\n');
}

function mkdirp(path, cb) {
  exec('mkdir -p ' + path, cb);
}

function error(err) {
  console.error(err);
  process.exit(1);
}

function tmpl(s,d) {
  return s.replace(/\{([a-z]+)\}/g, function(w,m) {
    return d[m] || '';
  });
}

function b64(path) {
  return tmpl('data:{mediatype};base64,{hash}', {
    mediatype: mime.lookup(path),
    hash: fs.readFileSync(path, 'base64')
  });
}
