module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	tasks.cssmin = {
		dist: {
			cwd:    grunt.uriBuild + "css",
			dest:   grunt.uriBuild + "css",
			expand: true,
			ext:    '.min.css',
			src:    [
				'**/*.css'
			]
		}
	};

	return tasks;
};
