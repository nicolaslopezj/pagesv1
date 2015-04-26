orion.pages = {
    templates: {},
    collection: new Meteor.Collection('pages'),
    updatePath: function (item) {
        var options = item;
        if (_.isString(item)) {
            options = {_id: item};
        }
        return Router.path('adminPagesUpdate', options);
    },
    indexPath: function (item) {
        return Router.path('adminPagesIndex');
    },
    deletePath: function (item) {
        var options = item;
            if (_.isString(item)) {
            options = {_id: item};
        }
        return Router.path('adminPagesRemove', options);
    },
    createPath: function (){
        return Router.path('adminPagesCreate');
    }
};

Roles.registerAction('pages.index', true);
Roles.registerAction('pages.insert', true);
Roles.registerAction('pages.update', true);
Roles.registerAction('pages.remove', true);

orion.pages.collection.allow({
    'insert': function (userId, doc) {
        return Roles.allow(userId, 'pages.insert', userId, doc)
    },
    'update': function (userId, doc, fields, modifier) {
        if (_.contains(fields, 'createdBy')) {
            return false;
        }
        return Roles.allow(userId, 'pages.update', userId, doc, fields, modifier)
    },
    'remove': function (userId, doc) {
        return Roles.allow(userId, 'pages.remove', userId, doc)
    },
    fetch: ['createdBy']
});

orion.pages.collection.helpers({
    path: function () {
        return Router.path('pages', {url: this.url});
    }
});

if (Meteor.isServer) {
    Meteor.publish('pages', function (arg1, arg2) {
        arg1 = arg1 ? arg1 : {};
        return orion.pages.collection.find(arg1, arg2);
    });
}

/**
 * Create a new template
 */
orion.pages.addTemplate = function (options, schema) {
    if (!options.template) {
        throw "Template is required";
    }

    var newTemplate = _.extend({
        name: options.template,
        description: 'No description'
    }, options);

    var newSchema = orion.pages.getNewTemplateSchema(schema, newTemplate);
    newTemplate.schema = new SimpleSchema(newSchema);

    orion.pages.templates[newTemplate.template] = newTemplate;

    return newTemplate;
}

orion.pages.getNewTemplateSchema = function (schema, newTemplate) {
    return _.extend({
        title: {
            type: String,
            label: "Title"
        },
        url: {
            type: String,
            regEx: /^[a-z0-9A-Z_-]+$/,
            unique: true,
            label: "Url"
        },
        template: {
            type: String,
            autoform: {
                omit: true
            },
            autoValue: function () {
                return newTemplate.template;
            }
        },
        createdAt: {
            type: Date,
            autoform: {
                omit: true
            },
            autoValue: function () {
                if (this.isInsert) {
                    return new Date;
                } else if (this.isUpsert) {
                    return {$setOnInsert: new Date};
                } else {
                    this.unset();
                }
            }
        },
        updatedAt: {
            type: Date,
            autoform: {
                omit: true
            },
            autoValue: function () {
                if (this.isUpdate) {
                    return new Date();
                }
            },
            denyInsert: true,
            optional: true
        },
        createdBy: {
            type: String,
            autoform: {
                omit: true
            },
            autoValue: function () {
                if (this.isInsert) {
                    return this.userId;
                } else if (this.isUpsert) {
                    return {$setOnInsert: this.userId};
                } else {
                    this.unset();
                }
            }
        }
    }, schema);
}

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Pages = new Tabular.Table({
    name: "PagesIndex",
    collection: orion.pages.collection,
    columns: [
        {data: "title", title: "Title"},
        {data: "url", title: "URL"}
    ]
});