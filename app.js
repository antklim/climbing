/**
 * Require Browsersync
 */
const browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
    server: '.',
    files: ['index.html', '*.js']
});
