
var util = require('util');

var levels = [
  'error',
  'warn',
  'info',
  'log',
  'debug'
];

var colors = [
  31,
  33,
  36,
  32,
  90
];

var Logger = function (opts) {
  opts = opts || {};
  this.colors = opts.colors || true;
  this.level = 4;
  this.enabled = true;
};

Logger.prototype.out = function (type) {
  var index = levels.indexOf(type),
    prefix = this.colors ? '   \033[' + colors[index] + 'm' + pad(type) + ' -\033[39m' : type + ':',
    args = toArray(arguments);

  if (index > this.level || !this.enabled)
    return this;

  args = args.map(function(arg) {
    return typeof arg === 'object' ? inspect(arg, prefix) : arg;
  });

  console.log.apply(console, [prefix].concat(args.slice(1)));

  return this;
};

levels.forEach(function (name) {
  Logger.prototype[name] = function () {
    this.out.apply(this, [name].concat(toArray(arguments)));
  };
});


module.exports = new Logger;


// ## helpers
function pad (str) {
  var max = 0;

  for (var i = 0, l = levels.length; i < l; i++)
    max = Math.max(max, levels[i].length);

  if (str.length < max)
    return str + new Array(max - str.length + 1).join(' ');

  return str;
};

function toArray(o) {
  return Array.prototype.slice.call(o);
};


function inspect(data, prefix) {
  return ('\n' + util.inspect(data, false, 4, true) + '\n').split('\n').map(function(line) {
    return !!line ? prefix + line : line;
  }).join('\n');
};