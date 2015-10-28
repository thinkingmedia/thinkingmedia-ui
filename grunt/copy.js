module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-copy');

	tasks.copy = {
		js:   {
			files: [
				{
					src:  grunt.uriBuild + 'js/today.min.js',
					dest: grunt.uriJs + 'today.min.js'
				}
			]
		},
		css:  {
			files: [
				{
					src:  grunt.uriBuild + 'css/today.min.css',
					dest: grunt.uriCss + 'today.min.css'
				}
			]
		},
		dev:  {
			files: [
				{
					src:  grunt.uri + 'index.dev.html',
					dest: grunt.uri + 'index.html'
				}
			]
		},
		prod: {
			files: [
				{
					src:  grunt.uri + 'index.prod.html',
					dest: grunt.uri + 'index.html'
				},
				{
					expand:  true,
					flatten: true,
					cwd:     grunt.uri + 'bower/fontawesome/fonts',
					src:     [
						'**'
					],
					dest:    grunt.uri + 'fonts/',
					filter:  'isFile'
				}
			]
		}
	};

	return tasks;
};
