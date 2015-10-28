var _ = require('lodash-node');

module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-concat');

	var files = _.map(grunt.vendor_js, function(file)
	{
		return grunt.uri + file;
	});
	files.push(grunt.uriSrc + '*/*.js');
	files.push(grunt.uriSrc + '*/*/*.js');
	files.push(grunt.uriSrc + '*/*/*/*.js');
	files.push(grunt.uriSrc + '*/*/*/*/*.js');
	files.push(grunt.uriSrc + '*/*/*/*/*/*.js');
	files.push(grunt.uriSrc + '*/*/*/*/*/*/*.js');
	files.push(grunt.uriSrc + '*/*/*/*/*/*/*/*.js');
	files.push('!' + grunt.uriSrc + '**/*.Test.js');

    tasks.concat = {
        js: {
            dest: grunt.dist + 'thinkingmedia-ui.js',
            src:  files
        }
    };

	return tasks;
};
