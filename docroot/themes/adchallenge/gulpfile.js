const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const globbing = require('gulp-css-globbing');

gulp.task('styles', () => {
	return gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
	return del([
		'./css/style.css',
	]);
});

gulp.task('watch', () => {
	gulp.watch('sass/**/*.scss', (done) => {
		gulp.series(['clean', 'sass'])(done);
	});
});

gulp.task('sass', function() {
  return gulp.src('./sass/style.scss')
    .pipe(globbing({
      // Configure it to use SCSS files
      extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', gulp.series(['clean', 'sass']));
