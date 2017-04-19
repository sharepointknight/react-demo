var gulp = require('gulp');
var spSync = require( 'gulp-sharepoint-sync' ); //https://github.com/Fabian-Schmidt/gulp-sharepoint-sync
var watch = require( 'gulp-watch' );
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var gutil = require("gulp-util");
var config = require('./config.json');

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("watch",function () {    
    var globs = [
            'src/**'
        ];
    var globs1 = [
        'dist/**'
    ]; 
    gulp.watch(globs, ["deploy"], function(event) {
        gutil.log("Dist Changed");
        /*gulp.src( globs1, { base: 'dist', buffer: false } )
            .pipe( conn.differentSize( '/Demo/react-bands' ) ) // only upload newer files
            .pipe( conn.dest( '/Demo/react-bands' ) );*/
    })
});
gulp.task("deploy", ["webpack:build-dev"], function () {
    gutil.log("Deploying to SharePoint");
    var conn = spSync.create({
        site:'https://sharepointknight.sharepoint.com/',
        authenticationMethod: 'ACS',
        auth_clientId: config.client_id,
        auth_clientSecret: config.secret,
        parallel: 5,
        log:      gutil.log,
        logLevel: 2
    });
    var globs1 = [
        'dist/**'
    ]; 
    gulp.src( globs1, { base: 'dist', buffer: false } )
        .pipe( conn.differentSize( '/Demo/react-bands' ) ) // only upload newer files
        .pipe( conn.dest( '/Demo/react-bands' ) );
});