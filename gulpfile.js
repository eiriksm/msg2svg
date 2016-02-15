'use strict';
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('scripts', function() {
  browserify('./browser.js')
    .bundle()
    .pipe(source('out.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!out.js', '!node_modules/**/*'], ['scripts']);
});


gulp.task('default', ['scripts']);
