const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const jetpack = require('fs-jetpack');
const bundle = require('./bundle');
const utils = require('./utils');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');

const projectDir = jetpack;
const srcDir = jetpack.cwd('./src');
const destDir = jetpack.cwd('./app');

var paths = {
    devDir: [
        './src/**/*.js',
        './src/**/*.html'
    ],
    copyFromAppDir: [
        './main.js',
        './spec.js',
        './node_modules/**',
        './bower_components/**',
        './vendor/**',
        './styles/**',
        './**/*.js',
        './**/*.html',
    ]
};
gulp.task('copy', ['sass'], () => {
   return projectDir.copyAsync('src', destDir.path(), {
        overwrite: true,
        matching: paths.copyFromAppDir
    })
  });


gulp.task('sass', ()=> {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        
        .pipe(gulp.dest(destDir.path()));
});

gulp.task('bundle',['ts'], () => {
  return Promise.all([
    bundle(destDir.path('background.js'), destDir.path('background.js')),
    bundle(destDir.path('app.js'), destDir.path('app.js')),
  ]);
});

gulp.task('less', () => {
  return gulp.src(srcDir.path('stylesheets/main.less'))
  .pipe(plumber())
  .pipe(less())
  .pipe(gulp.dest(destDir.path('stylesheets')));
});

gulp.task('environment', () => {
  const configFile = `config/env_${utils.getEnvName()}.json`;
  projectDir.copy(configFile, destDir.path('env.json'), { overwrite: true });
});

gulp.task('watch', () => {
  const beepOnError = (done) => {
    return (err) => {
      if (err) {
        utils.beepSound();
      }
      done(err);
    };
  };

  watch('src/**/*.js', batch((events, done) => {
    gulp.start('bundle', beepOnError(done));
  }));
  watch('src/**/*.less', batch((events, done) => {
    gulp.start('less', beepOnError(done));
  }));
});

var compilationOptions = {
    // "target": "es5",
    // "module": "commonjs",
    // "moduleResolution": "node",
    // "sourceMap": true,
    // "emitDecoratorMetadata": true,
    // "experimentalDecorators": true,
    // "lib": ["es2015", "dom"],
    // "noImplicitAny": true,
    // "suppressImplicitAnyIndexErrors": true

    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
};
gulp.task('ts', function() {

 var tsProject = ts.createProject(compilationOptions);

      var tsResult = gulp.src('src/**/*.ts')
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('app'));
});

gulp.task('build', ['ts', 'sass', 'copy', 'bundle','less','environment']);
