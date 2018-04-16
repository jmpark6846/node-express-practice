const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function(){
    gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/'));

    gulp.src('public/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/dist/'));
});

