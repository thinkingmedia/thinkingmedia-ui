module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-watch');

	tasks.watch = {
		sass:    {
			files:   [
				grunt.uriSrc + "/**/*.sass",
				grunt.uriSrc + "/**/*.scss"
			],
			tasks:   [
				'sass:dev'
			],
			options: {
				atBegin:   true,
				spawn:     false,
				interrupt: true
			}
		},
        docs: {
            files:   [
                grunt.uriSrc + "/**/*.js"
            ],
            tasks:   [
                'docs'
            ],
            options: {
                atBegin:   true,
                spawn:     false,
                interrupt: true
            }
        }
	};

	return tasks;
};
