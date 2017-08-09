const child             = require('child_process');
const browserSync       = require('browser-sync').create();

const gulp              = require('gulp');
const path              = require('path');
const autoprefixer      = require('gulp-autoprefixer');
const concat            = require('gulp-concat');
const css_minify        = require('gulp-cssnano');
const gutil             = require('gulp-util');
const scss              = require('gulp-sass');
const header            = require('gulp-header');
const htmlmin           = require('gulp-htmlmin');
const cleanCSS          = require('gulp-clean-css');
const rename            = require("gulp-rename");
const uglify            = require('gulp-uglify');

const del               = require('del');
const pkg               = require('./package.json');

const siteRoot          = '_site';
const cssFiles          = '_assets/sass/**/*.?(s)css';

// Set the banner content
var banner = ['/*!\n',
    ' * Code Bee - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');


// Deletes CSS.
gulp.task('clean:css', function(callback) {
    del(['_assets/css/main.css',
        'css/*.css'
    ]);
    callback();
});

// Deletes js.
gulp.task('clean:js', function(callback) {
    del('js/*.js');
    callback();
});

// Deletes vendor folder.
gulp.task('clean:vendor', function(callback) {
    del('vendor');
    callback();
});

// Deletes vendor folder.
gulp.task('clean:site', function(callback) {
    del('_site');
    callback();
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy:vendorlib', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('_assets/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('_assets/vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('_assets/vendor/font-awesome'))
})

gulp.task('copy:fonts', function() {
    gulp.src([
        '_assets/vendor/font-awesome/fonts/*.*',
        '_assets/vendor/bootstrap/fonts/*.*'
    ])
    .pipe(gulp.dest('fonts'))
});

// Minify compiled CSS
gulp.task('minify:css', ['build:sass'], function() {
    return gulp.src('_assets/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify:vendorcss', function() {
    return gulp.src([
        '_assets/vendor/bootstrap/css/bootstrap.css',
        '_assets/vendor/font-awesome/css/font-awesome.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify:js', function() {
    return gulp.src('_assets/js/main.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify vendor JS
gulp.task('minify:vendorjs', function() {
    return gulp.src([
        '_assets/vendor/jquery/jquery.js',
        '_assets/vendor/bootstrap/js/bootstrap.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//Minify HTML

gulp.task('minify:html', ['build:jekyll'], function() {
    return gulp.src([
        path.join(siteRoot, '*.html'),
        path.join(siteRoot, '*/*/*.html'),
        path.join(siteRoot, '*/*/*/*.html')
    ])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(siteRoot));
});

// Compile SCSS files from /_sass into /css
gulp.task('build:sass', function() {
    return gulp.src('_assets/sass/main.scss')
        .pipe(scss())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('_assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Build the Jekyll Site
gulp.task('build:jekyll', () => {
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
gulp.task('site:reload', () => {
  //browserSync.reload();
  browserSync.reload({stream:true, once: true});
});

//Serve Jekyll Site
gulp.task('site:serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    notify: false,
    open: false,
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['build:sass']);
});

// cleans all.
gulp.task('clean:all', ['clean:css', 'clean:js', 'clean:vendor', 'clean:site']);

// minifies all.
gulp.task('minify:all', ['minify:css','minify:vendorcss', 'minify:js', 'minify:vendorjs','minify:html']);

// build
gulp.task('build:all', ['build:sass', 'build:jekyll']);

// serve
gulp.task('serve:all', ['site:serve', 'site:reload']);

//Default task for dev
gulp.task('default', [ 'clean:all', 'copy:vendorlib', 'minify:all', 'copy:fonts', 'build:jekyll', 'serve:all']);