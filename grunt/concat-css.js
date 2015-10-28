var _ = require('lodash-node');

module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-concat');

	var files = _.map(grunt.vendor_css, function(file)
	{
		return grunt.uri + file;
	});
	files.push(grunt.uriCss + 'App/App.css');
	files.push(grunt.uriCss + 'UI/UI.css');
    files.push(grunt.uriCss + 'Net/Net.css');

	tasks.concat.css = {
		dest: grunt.uriBuild + 'css/today.css',
		src:  files
	};

	return tasks;
};
