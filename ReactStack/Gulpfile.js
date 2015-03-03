var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglifyjs');
var glob = require('glob');
var karma = require('gulp-karma');
var util = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var sourcemap = require('gulp-sourcemaps');
var merge = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var seq = require('run-sequence');
var react = require('gulp-react');

var bower = require('wiredep')({
  overrides:{
    'react':{
      main:[
        'react.js',
        'JSXTransformer.js'
      ]
    }
  }
});

/* Global browserify entry point */
var mainJs = './index.js';

/* Global distribution path */
var distPath = './dist';

/* Global variables for karma task */
var karmaTestFiles = './tests/karma/**/*.spec.js';
var karmaBundleJs  = './test/karma-bundle.js';
var karmaConfFile  = './Karma.conf.js';

/* Global variables for application build destination */
var bundleJs = 'app.js';
var distJs   = distPath + '/js/';
var distCss  = distPath + '/css/';

/* Global variables for static library destination */
var libPath  = './dist';
var libFonts = libPath + '/fonts/';
var libJs    = libPath + '/vendor/js/';
var libCss   = libPath + '/vendor/css/';

/* Global variables for example server */
var examplePublic = './example/public';
var exampleJs = examplePublic + '/js/';
var exampleCss = examplePublic + '/css/';
var exampleFonts = examplePublic + '/fonts/';

var handleError = function(error) {
    util.log(error);
    util.beep();

    return this.emit("end");
};

gulp.task('default',['server:start']);

gulp.task('server:start',['bower:build','react:build'],function(){
    server.listen({path:'./example/stackdemo.js'});
    gulp.watch(['./react/**/*.js','index.js'],['react:build']);
});

gulp.task('bower:build',function(){

    var jsFiles  = bower.js;
    var cssFiles = bower.css;

    var fonts = [
      './bower_components/bootstrap/fonts/*.*',
      './bower_components/bootstrap-material-design/fonts/*.*'
    ];

    return merge(
        gulp.src(jsFiles)
            .pipe(uglify('lib.min.js'))
            .pipe(gulp.dest(libJs))
            .pipe(gulp.dest(exampleJs)),
        gulp.src(cssFiles)
            .pipe(concat('lib.css'))
            .pipe(gulp.dest(libCss)) //buffer maybe?
            .pipe(minifyCss())
            .pipe(rename('lib.min.css'))
            .pipe(gulp.dest(libCss))
            .pipe(gulp.dest(exampleCss)),
        gulp.src(fonts)
            .pipe(gulp.dest(libFonts))
            .pipe(gulp.dest(exampleFonts))
    ).on('error',handleError);
});

gulp.task('react:build',function(){
    return browserify(mainJs)
        .transform(reactify)
        .bundle()
        .on('error',handleError)
        .pipe(source(bundleJs))
        .on('error',handleError)
        .pipe(buffer())
        .on('error',handleError)
        //.pipe(uglify())
        .on('error',handleError)
        .pipe(gulp.dest(distJs))
        .pipe(gulp.dest(exampleJs));
});

gulp.task('karma',function(){
    var testFiles = glob.sync(karmaTestFiles);

    var browserifyOptions = {
        entries:[
            mainJs,
            testFiles
        ]
    };

    var karmaOptions = {
        configFile:karmaConfFile,
        action:'run'
    };

    return browserify(browserifyOptions)
        .transform(reactify)
        .on('error',handleError)
        .bundle()
        .on('error',handleError)
        .pipe(source(karmaBundleJs))
        .on('error',handleError)
        .pipe(buffer())
        .pipe(uglify())
        .on('error',handleError)
        .pipe(karma(karmaOptions))
        .on('error',handleError);
});

gulp.task('phantom',function(){});