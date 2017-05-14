module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                expand: true,
                src: 'm/res/logistimoen.js',
                dest: 'out',
                flatten: true
            },
            converted: {
                expand: true,
                src: 'out/logistimoen.js',
                dest: 'm/res/',
                flatten: true
            }
        },
        preprocess: {
            options: {
                context: {
                    isCustomDeployment: grunt.option('custom') != undefined
                }
            },
            replace: {
                files: [
                    {
                        src: 'm/index.html',
                        dest: 'm/index.html'
                    }
                ]
            }
        },
        execute: {
            target: {
                src: ['m/res/convert.js']
            }
        },
        toggleComments: {
            customOptions: {
                options: {
                    removeCommands: true
                },
                files: {
                    "m/index.html": "m/index.html",
                }
            }
        },
        if: {
            default: {
                options: {
                    test: function(){ return grunt.option('custom') != undefined; }
                },
                ifTrue: ['copy:main','preprocess:replace','toggleComments','execute:target','rename:converted','copy:converted','clean:temp']
            }
        },
        clean: {
            temp: {
                src: [ 'out' ]
            }
        },
        rename: {
            converted: {
                files: [
                    {src: ['out/logistimoconverted.js'], dest: 'out/logistimoen.js'}
                ]
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-comment-toggler');
    grunt.loadNpmTasks('grunt-if');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('readArgs','Reading arguments', function(n){
        console.log(grunt.option("custom"));
    });

    // Register the default tasks.
    grunt.registerTask('default', ['if']);
};