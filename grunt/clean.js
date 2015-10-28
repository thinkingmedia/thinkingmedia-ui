module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-clean');

	tasks.clean = [
		grunt.dist + '*.css',
		grunt.dist + '*.map',
		grunt.dist + '*.js'
	];

	return tasks;
};
