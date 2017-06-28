var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', ['serve']);

gulp.task('serve', function() {
  browserSync.init({
    server: '.',
    port: 3000
  });
});