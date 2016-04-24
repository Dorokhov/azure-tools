var gulp = require('gulp');
var browserify = require('gulp-browserify');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var gulpCopy = require('gulp-copy');

gulp.task('clean', function () {
    return gulp
         .src(['./dist/*', './built/*'], { read: false })
         .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
    return gulp.src('src/**/*.ts')
		.pipe(ts({
		    noImplicitAny: true,
		    out: 'app.module.js'
		}))
		.pipe(gulp.dest('built/local'));
});

gulp.task('bundle', ['compile'], function () {
    return gulp.src('./built/local/app.module.js')
         .pipe(browserify({
             insertGlobals: true
         }))
         .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', ['bundle'], function() {
    gulp
        .src('./src/index.html')
        .pipe(gulpCopy('./dist', { prefix: 1 }));

    gulp
        .src('./src/manifest.json')
        .pipe(gulpCopy('./dist', { prefix: 1 }));

    gulp
        .src('./src/startup.js')
        .pipe(gulpCopy('./dist', { prefix: 1 }));
});

gulp.task('default', ['clean', 'compile', 'bundle', 'copy']);
