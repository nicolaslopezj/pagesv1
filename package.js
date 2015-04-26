Package.describe({
	name: 'orionjs:pages',
	summary: 'Pages for Orion CMS',
	version: '1.0.0',
	git: 'https://github.com/orionjs/pages'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'orionjs:core',
		'orionjs:base',
		'aldeed:collection2@2.0.0',
		'aldeed:tabular',
		'aldeed:autoform',
		'fortawesome:fontawesome'
		]);

	api.imply([

		]);

	api.addFiles([
		'init.js',
		'admin.js',
		]);

	api.addFiles([
		'views/index/index.html',
		'views/index/index.js',
		'views/update/update.html',
		'views/update/update.js',
		'views/delete/delete.html',
		'views/delete/delete.js',
		'views/create/create.html',
		'views/create/create.js',

		'pages.js'
		], 'client');

});