Template.adminPagesDelete.helpers({
	onSuccess: function () {
		return function (result) { 
			Router.go('adminPagesIndex'); 
		};
	}
});

ReactiveTemplates.events('adminPagesDelete', {
	'click .confirm-delete': function() {
		orion.pages.remove(this.item._id, function() {
			Router.go(pages.indexPath);
		});
	}
});