
var util = require('util'),
  exec = require('child_process').exec,
  mime = require('mime'),
  path = require('path'),
  fs = require('fs');

// #### helpers
var mkdirp = exports.mkdirp = function mkdirp(path, cb) {
  exec('mkdir -p ' + path, cb);
};

var error = exports.error = function error(err) {
  console.error(err);
  process.exit(1);
};

var tmpl = exports.tmpl = function tmpl(s,d) {
  return s.replace(/\{([a-z]+)\}/g, function(w,m) {
    return d[m] || '';
  });
};

var b64 = exports.b64 = function b64(path) {
  return tmpl('data:{mediatype};base64,{hash}', {
    mediatype: mime.lookup(path),
    hash: fs.readFileSync(path, 'base64')
  });
};

var ghHint = exports.ghHint = function ghHint(config) {
  return [
    'Failed to load github ' + config + ' from git config.',
    '',
    'Run these two commands:',
    '',
    'git config --global github.user "your-github-username"',
    'git config --global github.token "your-github-token"',
    '',
    '',
    'To verify that they have been set, use:',
    '',
    'git config --get github.user',
    'git config --get github.token',
    ''
  ].join('\n');
};
