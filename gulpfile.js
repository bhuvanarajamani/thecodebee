const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const css_minify = require('gulp-cssnano');
const gutil = require('gulp-util');
const scss = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

const siteRoot = '_site';
const cssFiles = '_sass/**/*.?(s)css';

// Set the banner content
var banner = ['/*!\n',
    ' * Code Bee - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Compile SCSS files from /_sass into /css
gulp.task('sass', function() {
    return gulp.src('_sass/main.scss')
        .pipe(scss())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

/*
gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(scss().on('error', scss.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(css_minify())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./assets/css'));
});
*/

// Build the Jekyll Site
gulp.task('build', () => {
  const jekyll = child.spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--incremental', '--drafts']);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

//Reload Browser
gulp.task('reload', () => {
  browserSync.reload();
});

//Serve Jekyll Site
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    notify: false,
    open: false,
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['css']);
});

//Default task for dev
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy', 'build', 'serve', 'reload']);