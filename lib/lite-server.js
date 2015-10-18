var historyFallback = require('connect-history-api-fallback');
var log = require('connect-logger');
var yargs = require('yargs');
var sync = require('browser-sync').create();
var defaultSource = 'src';

yargs.option('files', {
  describe: 'array of file paths to watch',
  type: 'array'
});

var argv = yargs.argv;

var options =
  {
    source: argv.source || defaultSource,
    files: argv.files ? argv.files : [
      (argv.source || defaultSource) + '/**/*.html',
      (argv.source || defaultSource) + '/**/*.css',
      (argv.source || defaultSource) + '/**/*.js'
    ],
    baseDir: argv.baseDir || './',
    fallback: argv.fallback || '/' + (argv.source || defaultSource) + '/index.html'
  };

if (argv.verbose) {
  console.log('options', options);
}

sync.init({
  server: {
    baseDir: options.baseDir,
    middleware: [
      log(),
      historyFallback({ index: options.fallback })
    ]
  },
  files: options.files,
});