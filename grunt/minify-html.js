module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	tasks.htmlmin = {
		prod:  {
			options: {
				collapseWhitespace: true,
				removeComments:     true
			},

			files: [
				{
					dest:    grunt.uriBuild + "html",
					expand:  true,
					ext:     '.html',
					flatten: false,
					src:     [
						grunt.uriSrc + '**/*.html'
					]
				}
			]
		},
		index: {
			options: {
				collapseWhitespace: true,
				removeComments:     true
			},
			files:   [
				{
					dest: grunt.uri + "index.prod.html",
					src:  grunt.uri + "index.prod.html"
				}
			]
		}
	};

	return tasks;
};
