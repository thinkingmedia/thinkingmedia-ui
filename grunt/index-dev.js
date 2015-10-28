var fs = require('fs');
var _ = require('lodash-node');

module.exports = function(grunt, tasks)
{
	function timeStamp(url)
	{
		if(/^https?:\/\//.test(url)) {
            return url;
        }
		if(url[0] != '/')
		{
			url = '/' + url;
		}
		return url;
	}

	tasks.indexDev = {
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

	grunt.registerMultiTask('indexDev', function()
	{
		var scripts = grunt.vendor_js.concat(this.filesSrc);
		var styles = grunt.vendor_css.concat([
            'css/App/App.css',
            'css/UI/UI.css',
            'css/Net/Net.css'
        ]);

		grunt.file.copy('www/_index.html', 'www/index.dev.html', {
			process: function(contents, path)
			{
				return grunt.template.process(contents, {
					data: {
						scripts: _.map(scripts, timeStamp),
						styles:  _.map(styles, timeStamp),
						api:     'http://api.whathappentoday.local',
						version: grunt.config('pkg.version')
					}
				});
			}
		});

	});

	return tasks;
};
