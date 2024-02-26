 define("MultiEditServicesModule", ["ModalBox", "BaseSchemaModuleV2"],
		function(ModalBox) {
	Ext.define("Terrasoft.configuration.MultiEditServicesModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.MultiEditServicesModule",

		generateViewContainerId: false,

		initSchemaName: function() {
			this.schemaName = "MultiEditServicesPage";
		},

		initHistoryState: Terrasoft.emptyFn,
		
		createViewModel: function() {
      		var viewModel = this.callParent(arguments);
      		var parameters = this.parameters;

      		if (parameters) {
        		viewModel.set("selectedItems", parameters.selectedItems);
      		}

      	return viewModel;
    	},
	});
	return Terrasoft.MultiEditServicesModule;
});