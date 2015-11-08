'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  inject = require('gulp-inject'),
  wiredep = require('wiredep').stream,
  gulpif = require('gulp-if'),
  minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  angularFilesort = require('gulp-angular-filesort'),
  templateCache = require('gulp-angular-templatecache'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  jscs = require('gulp-jscs'),

  src = './src',
  dist = './dist',

  paths = {
    indexFile: src + '/index.html',
    js: src + '/app/**/*.js',
    scss: {
      main: src + '/assets/sass/*.scss',
      modules: src + '/app/**/*.scss'
    },
    html: src + '/**/*.html',
    tpl: src + '/app/**/*.tpl.html',
    mainScssFile: src + '/assets/sass/main.scss',
    tmp: src + '/tmp'
  };

gulp.task('server', function() {
  connect.server({
    root: src,
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true
  });
});

gulp.task('server-dist', function() {
  connect.server({
    root: dist,
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true
  });
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint(src + '/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src(paths.mainScssFile)
    .pipe(sassGlob())
    .pipe(sass().on('error', function(error) {
      console.log(error);
    }))
    .pipe(gulp.dest(paths.tmp + '/css'));
});

gulp.task('inject', function() {
  return gulp.src('index.html', {
      cwd: src
    })
    .pipe(inject(
      gulp.src([paths.js, paths.tmp + '/scripts/*.js']).pipe(angularFilesort()), {
        read: false,
        ignorePath: '/src'
      }))
    .pipe(inject(
      gulp.src(['./src/css/**/*.css']), {
        read: false,
        ignorePath: '/src'
      }
    ))
    .pipe(gulp.dest(src));
});

gulp.task('wiredep', function() {
  gulp.src(paths.indexFile)
    .pipe(wiredep({
      directory: './src/lib'
    }))
    .pipe(gulp.dest(src));
});

gulp.task('templates', function() {
  gulp.src(paths.tpl)
    .pipe(templateCache({
      root: 'app/',
      module: 'app'
    }))
    .pipe(gulp.dest(paths.tmp + '/scripts'));
});

gulp.task('compress', ['temps'], function() {
  gulp.src(paths.indexFile)
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({
      mangle: false
    })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest(dist));
});

gulp.task('copy', function() {
  gulp.src(paths.indexFile)
    .pipe(useref())
    .pipe(gulp.dest(dist));
  gulp.src('./src/lib/font-awesome/fonts/**')
    .pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('watch', function() {
  gulp.watch([paths.html], ['html', 'templates']);
  gulp.watch([paths.scss.main, paths.scss.modules], ['css', 'inject']);
  gulp.watch([paths.js, './Gulpfile.js'], ['jscs', 'jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('temps', ['templates', 'css', 'inject']);
gulp.task('default', ['server', 'temps', 'wiredep', 'watch']);
gulp.task('build', ['compress', 'copy']);

