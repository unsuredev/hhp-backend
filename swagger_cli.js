module.exports = {
    info: {
        // API informations (required)
        title: 'Hello World', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A sample API', // Description (optional)
    },
    basePath: '/', // Base path (optional)
    apis:['dist/app.js','dist/controllers/*.js','dist/models/*.js']
};