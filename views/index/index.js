Template.adminPagesIndex.events({
    'click tr': function (event) {
        if (!$(event.target).is('td')) return;
        var collection = Template.currentData().collection;
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (rowData) {
            var path = orion.pages.updatePath(rowData._id);
            Router.go(path);
        }
    }
});
