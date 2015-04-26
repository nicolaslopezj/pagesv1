AutoForm.hooks({
	adminPagesUpdateForm: {
		onSuccess: function() {
			Router.go('adminPagesIndex');
		}
	}
});

Template.adminPagesUpdate.helpers({
	getSchema: function () {
		return orion.pages.templates[this.template].schema;
	}
});

Template.adminPagesUpdate.events({

	'click .save-btn': function () {
		$("#adminPagesCreateForm").submit();
	}
});
