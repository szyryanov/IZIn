module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ---------------------------------------
        //            lint:
        // ---------------------------------------

        jshint: {
            all: ['Gruntfile.js', 'Dev/js/**/*.js', 'Dev/cursor-zoom/cursor-zoom.js']
        },

        csslint: {
            lint: {
                src: ['Dev/css/**/*.css']
            }
        },

        // ---------------------------------------
        //            build:
        // ---------------------------------------

        copyto: {
            stuff: {
                files: [
                  { cwd: 'Dev/img/', src: ['**/*'], dest: 'MainTest/img/' },
                  { cwd: 'Dev/izin-images/', src: ['**/*'], dest: 'MainTest/lib/izin/' },
                  { cwd: 'Dev/css/', src: ['izin.css'], dest: 'MainTest/lib/izin/' },
                  { cwd: 'Dev/cursor-zoom/', src: ['*.cur'], dest: 'MainTest/lib/izin/' },
                ],
            }
        },

        preprocess: {
            options: {
                context: {
                    DEBUG: false
                }
            },
            js: {
                src: 'Dev/js/izin.js',
                dest: 'MainTest/lib/izin/izin.js'
            }
        },

        bom2: {
            main: {
                src: [
                  "MainTest/lib/izin/izin.js"
                ]
            }
        },

        uglify: {
            my_target: {
                files: {
                    'MainTest/lib/izin/izin.min.js': ['MainTest/lib/izin/izin.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'MainTest/lib/izin/izin.min.css': ['MainTest/lib/izin/izin.css']
                }
            }
        },

        // ---------------------------------------
        //            dist:
        // ---------------------------------------

        zip: {
            dist_dev: {
                compression: 'DEFLATE',
                cwd: 'MainTest/lib/izin/',
                src: ['MainTest/lib/izin/izin.js', 'MainTest/lib/izin/izin.css', 'MainTest/lib/izin/*.cur', 'MainTest/lib/izin/*.gif'],
                dest: 'Dist/izin.dev.zip'

            },
            dist_min: {
                compression: 'DEFLATE',
                cwd: 'MainTest/lib/izin/',
                src: ['MainTest/lib/izin/izin.min.js', 'MainTest/lib/izin/izin.min.css', 'MainTest/lib/izin/*.cur', 'MainTest/lib/izin/*.gif'],
                dest: 'Dist/izin.min.zip'
            },
            dist_all: {
                compression: 'DEFLATE',
                cwd: 'MainTest/lib/izin/',
                src: ['MainTest/lib/izin/*.*'],
                dest: 'Dist/izin.zip'
            },
        }



    });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-bom2');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-zip');

  // Default task(s).
  grunt.registerTask('default', ['lint']);

  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('build', ['copyto', 'preprocess', 'bom2', 'uglify', 'cssmin']);
  grunt.registerTask('dist', ['build', 'zip']);

};