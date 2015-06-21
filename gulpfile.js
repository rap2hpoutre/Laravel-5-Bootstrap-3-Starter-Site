var gulp = require("gulp");
var bower = require("gulp-bower");
var elixir = require("laravel-elixir");

gulp.task('bower', function() {
    return bower();
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

var paths = {
    'jquery': 'vendor/jquery-legacy/dist',
    'bootstrap': 'vendor/bootstrap-sass/assets',
    'bootswatch': 'vendor/bootswatch',
    'fontawesome': 'vendor/font-awesome',
    'metisMenu': 'vendor/metisMenu/dist',
    'colorbox': 'vendor/jquery-colorbox',
    'dataTables': 'vendor/datatables/media',
    'dataTablesBootstrap3Plugin': 'vendor/datatables-bootstrap3-plugin/media'
};

elixir.config.sourcemaps = false;

elixir(function (mix) {

    // Run bower install
    mix.task('bower');

    // Copy fonts straight to public
    mix.copy('resources/' + paths.bootstrap + '/fonts/bootstrap/**', 'public/fonts');
    mix.copy('resources/' + paths.fontawesome + '/fonts/**', 'public/fonts');

    // Copy images straight to public
    mix.copy('resources/' + paths.colorbox + '/example3/images/**', 'public/img');

  // Compile SASS and output to default resource directory
    mix.sass('site.scss', 'resources/assets/build/site.css', {
        includePaths: [
            'resources/' + paths.bootstrap + '/stylesheets/',
            'resources/' + paths.bootswatch + '/',
            'resources/' + paths.fontawesome + '/scss/'
        ]
    });

    // Merge Site CSSs.
    mix.styles([
        paths.colorbox + '/example3/colorbox.css',
        'assets/build/site.css' // Note: site.css is generated by sass and has some overrides.
    ], 'public/css/site.css', 'resources/');

    // Merge Site scripts.
    mix.scripts([
        paths.jquery + '/jquery.js',
        paths.bootstrap + '/javascripts/bootstrap.js',
        paths.colorbox + '/jquery.colorbox.js'
    ], 'public/js/site.js', 'resources/');

    // Compile SASS and output to default resource directory.
    mix.sass('admin.scss', 'resources/assets/build/admin.css', {
        includePaths: [
            'resources/' + paths.bootswatch + '/'
        ]
    });

    // Merge Admin CSSs.
    mix.styles([
        paths.dataTablesBootstrap3Plugin + '/css/datatables-bootstrap3.css',
        paths.metisMenu + '/metisMenu.css',
        'assets/build/admin.css' // Note: admin.css is generated by sass and has some overrides.
    ], 'public/css/admin.css', 'resources/');

    // Merge Admin scripts.
    mix.scripts([
        paths.dataTables + '/js/jquery.dataTables.js',
        paths.dataTablesBootstrap3Plugin + '/js/datatables-bootstrap3.js',
        paths.metisMenu + '/metisMenu.js'
    ], 'public/js/admin.js', 'resources/');

    // Cache-bust all.css and all.js files.
    mix.version([
        'css/site.css',
        'css/admin.css',
        'js/site.js',
        'js/admin.js'
    ]);
});

