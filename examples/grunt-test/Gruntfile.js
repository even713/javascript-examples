// module.exports = function (grunt) {

// 	grunt.loadNpmTasks('grunt-contrib-connect');
// 	grunt.loadNpmTasks('grunt-criticalcss');

// 	grunt.initConfig({
// 	    criticalcss: {
// 	        custom: {
// 	            options: {
// 	                url: "http://localhost:4502/content/ford/cn/zh_cn/home.html?wcmmode=disabled",
// 	                width: 1200,
// 	                height: 900,
// 	                outputfile: "dist/critical.css",
// 	                filename: "guxfoap-css-all.css", // Using path.resolve( path.join( ... ) ) is a good idea here 
// 	                buffer: 800*1024,
// 	                ignoreConsole: false
// 	            }
// 	        }
// 	    },

// 	      connect: {
// 		    server: {
// 		      options: {
// 		        port: 8000,
// 		        hostname: '*',
// 		        base: ['src/']
// 		      }
// 		    }
// 		  }
// 	});



// 	grunt.registerTask('default', ['criticalcss']);
// 	grunt.registerTask('connect', ['connect']);

// }

module.exports = function (grunt) {  

    // Project configuration.  
    grunt.initConfig({  
	    criticalcss: {
	        custom: {
	            options: {
	                url: "http://localhost:4502/content/ford/cn/zh_cn/home.html?wcmmode=disabled",
	                width: 1200,
	                height: 900,
	                outputfile: "dist/critical.css",
	                filename: "guxfoap-css-all.css", // Using path.resolve( path.join( ... ) ) is a good idea here 
	                buffer: 800*1024,
	                ignoreConsole: false
	            }
	        }
	    },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: ['src/'],
                    keepalive: true
                }
            }
        },
          critical_css: {
            dist: {
              url: 'http://localhost:4502/content/ford/cn/zh_cn/home.html?wcmmode=disabled',
              dest: 'dist/critical.css'
            },
          },

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-critical-css');

    //grunt.registerTask('connect', ['connect']);
}

// module.exports = function(grunt) {

//   // 非常基本的默认任务
//   grunt.registerTask('default', 'Log some stuff.', function() {
//     grunt.log.write('Logging some stuff...').ok();
//   });

// };