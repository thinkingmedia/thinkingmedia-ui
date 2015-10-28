module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-watch');

	tasks.watch = {
		sass:    {
			files:   [
				grunt.uriSrc + "**/*.sass",
				grunt.uriSrc + "**/*.scss"
			],
			tasks:   [
				'compass:dev'
			],
			options: {
				atBegin:   true,
				spawn:     false,
				interrupt: true
			}
		},
		scripts: {
			files:   [
				grunt.uriSrc + "**/*.js"
			],
			tasks:   [
				'index:dev',
				'copy:dev'
			],
			options: {
				atBegin: true,
				event:   ['added', 'deleted']
			}
		}
	};

	return tasks;
};
