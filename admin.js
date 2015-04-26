/**
 * Register the Page admin routes and add protection
 */
Router.route('/admin/pages', function() {
    this.layout(ReactiveTemplates.get('layout'));
    this.render('adminPagesIndex');
} , {
    name: 'adminPagesIndex',
    waitOn: function() {
        return Meteor.subscribe('pages');
    },
    data: function() {
        return {pages: orion.pages.collection.find() };
    }
});
orion.accounts.addProtectedRoute('adminPagesIndex');

Router.route('/admin/pages/:_id/edit', function() {
    this.layout(ReactiveTemplates.get('layout'));
    this.render('adminPagesUpdate');
} , {name: 'adminPagesUpdate'});
orion.accounts.addProtectedRoute('adminPagesUpdate');

Router.route('/admin/pages/:_id/delete', function() {
    this.layout(ReactiveTemplates.get('layout'));
    this.render('adminPagesDelete');
} , {name: 'adminPagesDelete'});
orion.accounts.addProtectedRoute('adminPagesDelete');

Router.route('/admin/create', function() {
    this.layout(ReactiveTemplates.get('layout'));
    this.render('adminPagesCreate');
} , {name: 'adminPagesCreate'});
orion.accounts.addProtectedRoute('adminPagesCreate');

/**
 * Register the Pages link in the admin panel
 */
orion.addLink({
    section: 'medium',
    title: 'Pages',
    routeName: 'adminPagesIndex',
    activeRouteRegex: 'adminPages'
});

/**
 * Register page routes on meteor startup
 */
Meteor.startup(function(){
    Router.route('/:url', function() {
        this.wait(Meteor.subscribe('pages', { url: this.params.slug }));
        if (this.ready()) {
            var page = orion.pages.collection.findOne({url: this.params.url});
            var template = orion.pages.templates[page.template];
            if (page) {
                if (template.layout) {
                    this.layout(template.layout);
                }
                this.render(page.template, {data: page});
            }
        }

    }, { name: 'pages' });
});
