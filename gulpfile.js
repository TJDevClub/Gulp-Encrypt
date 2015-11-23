var gulp    = require('gulp');

var encrypt = require("gulp-simplecrypt").encrypt;
var decrypt = require("gulp-simplecrypt").decrypt;

//see https://github.com/ShowClix/simplecrypt#api for options
var options = {
    password: process.env.password || "razzlefrazzle"    
}

gulp.task('encrypt', function(){
    gulp.src('./secret/**/*')//encrypt everything inside of secret
        .pipe(encrypt(options))
        .pipe(gulp.dest('./encrypted'))
})

gulp.task('decrypt', function(){
    gulp.src('./encrypted/**/*')
        .pipe(decrypt(options))
        .pipe(gulp.dest('./decrypted'))
})

gulp.task('watch', function() {
    gulp.watch('./secret/*', function() {
        gulp.run('encrypt');
    });

  gulp.watch('./encrypted/*', function() {
    gulp.run('decrypt');
  });
});

// gulp.task('default', ['encrypt', 'decrypt', 'watch']);
gulp.task('default', ['encrypt', 'decrypt', 'watch']);
