var fs = require('fs');
var _ = require('lodash-node');

module.exports = function(grunt, tasks)
{
	function timeStamp(url)
	{
		if(url[0] != '/')
		{
			url = '/' + url;
		}
		var file = 'www' + url;
		return grunt.file.exists(file)
			? url + '?' + fs.statSync(file).mtime.valueOf()
			: url;
	}

	tasks.indexProd = {
		dev: {
			cwd: 'www',
			src: [
				'src/*/*.js',
				'src/*/*/*.js',
				'src/*/*/*/*.js',
				'src/*/*/*/*/*.js',
				'src/*/*/*/*/*/*.js',
				'src/*/*/*/*/*/*/*.js',
				'src/*/*/*/*/*/*/*/*.js',
				'!src/**/*.Test.js'
			]
		}
	};

	grunt.registerMultiTask('indexProd', function()
	{
		grunt.file.copy('www/_index.html', 'www/index.prod.html', {
			process: function(contents, path)
			{
				return grunt.template.process(contents, {
					data: {
						scripts: _.map(['js/today.min.js'], timeStamp),
						styles:  _.map(['css/today.min.css'], timeStamp),
						api:     'http://api.whathappentoday.com',
						version: grunt.config('pkg.version')
					}
				});
			}
		});

	});

	return tasks;
};
