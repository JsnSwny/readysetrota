var gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var useref = require("gulp-useref");
var concat = require("gulp-concat");

gulp.task("sass", function() {
  return gulp
    .src("frontend/src/scss/**/*.scss")
    .pipe(sass())
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("frontend/src/css"));
});

gulp.task(
  "watch",
  gulp.series("sass", function() {
    gulp.watch("frontend/src/scss/**/*.scss", gulp.series(["sass"]));
    // Other watchers
  })
);
