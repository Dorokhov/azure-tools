var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var clean = require('gulp-clean');
var gulpCopy = require('gulp-copy');
var $ = require('gulp-load-plugins')({ lazy: true });
var inlineCss = require('gulp-inline-css');
var flatten = require('gulp-flatten');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var inject = require('gulp-inject');

gulp.task('clean', function () {
    return gulp
         .src(['./dist/*', './built/*'], { read: false })
         .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
    return tsProject.src('./src/**/*.ts')
		.pipe(ts(tsProject))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle', ['compile'], function () {
    return browserify({ entries: './dist/app/app.module.js' })
        .bundle()
        //.on('error', function (err) { console.log(err) })
        .pipe(source('app.module.js'))
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('copy', ['bundle'], function () {
    gulp
        .src('./src/manifest.json')
        .pipe(gulpCopy('./dist', { prefix: 1 }));

    gulp
        .src('./src/startup.js')
        .pipe(gulpCopy('./dist', { prefix: 1 }));

    gulp
       .src('./src/app/**/*.html')
       .pipe(gulpCopy('./dist', { prefix: 1 }));
});

gulp.task('copy-css', ['bundle'], function () {
    gulp
        .src('./node_modules/angular-material/*.css')
        .pipe(gulpCopy('./dist'));

    return gulp
         .src('./src/styles/**/*')
         .pipe(gulpCopy('./dist/styles', { prefix: 2 }));
});

gulp.task('inject-css', ['copy-css'], function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([
        './node_modules/angular-material/*.css',

    ], {
        read: false,
    });
    return target
        .pipe(inject(sources, {
            relative: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('inline-css', ['wiredep'], function () {
    console.log('Inlining CSS');
    return gulp.src('./dist/index.html')
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
        }));
});

gulp.task('flatten-js', ['wiredep'], function () {
    gulp.src('node_modules/**/*.min.js')
      .pipe(flatten({ includeParents: 1 }))
      .pipe(gulp.dest('./dist/node_modules'));
});

gulp.task('default', [
    'clean',
    'compile',
    'bundle',
    'copy',
    'copy-css',
   'inject-css',
]);
