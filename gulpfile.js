var gulp = require('gulp'),
		concat = require('gulp-concat'),//加载插件，参数为插件名
		concat = require('gulp-jshint')  //js压缩
		;
// task这个API用来创建任务，在命令行下可以输入 gulp test 来执行test的任务。
// watch这个API用来监听文件变化。
// src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss。
// dest这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。
// run这个API用来运行指定任务 

gulp.task('default',['watch']);

gulp.task('jshint',function(){
	return gulp.src('application/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('concat',function(){
	// 这个是合并任务
	return gulp.src('application/*.js') //需要合并的js目录，支持正则
	.pipe(concat('all.js')) //concat()合并操作，参数：合并后的名字
	.pipe(gulp.dest('build/'))//合并后放入的目录
})

gulp.task('default1', function() {
  // 将你的默认的任务代码放在这
  console.log('henry');
});


gulp.task('watch',function(){
	gulp.watch('application/*.js',['jshint']);
})