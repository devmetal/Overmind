/**
 * Created by Adam on 2015.02.11..
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test',function(){
    return gulp.src('./tests/**/*.spec.js')
        .pipe(mocha({
            reporter:'nyan'
        }))
        .on('error',function(err){
            throw err;
        });
});