 define("MultiEditServicesPage", ["ServiceHelper", "ModalBox", "css!MultiEditServicesCSS"], function(ServiceHelper, ModalBox) {
	return {
		entitySchemaName: "ServiceItem",
		attributes: {
		
			"isSaveButtonVisible": {
    			dataValueType: Terrasoft.DataValueType.GUID,
    			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
    			value: false
  			},
		
			"Status": {
      			onChange: "saveButtonVisible"
			},
			
			"INKDisplayOnPortal": {
      			onChange: "saveButtonVisible"
			},
			
			"ReactionTimeUnit": {
      			onChange: "saveButtonVisible"
			},
			
			"ReactionTimeValue": {
      			onChange: "saveButtonVisible"
			},
			
			"SolutionTimeUnit": {
      			onChange: "saveButtonVisible"
			},
			
			"SolutionTimeValue": {
      			onChange: "saveButtonVisible"
			},
			
			"INKMatchingTime": {
      			onChange: "saveButtonVisible"
			},
			
			"INKClarificationTime": {
      			onChange: "saveButtonVisible"
			},
			
			"INKClosingTime": {
      			onChange: "saveButtonVisible"
			},
			
			"G3CServiceTotal_Sla": {
      			onChange: "saveButtonVisible"
			},
			
			"G3CServiceTotal_Exectime": {
      			onChange: "saveButtonVisible"
			},
			
			"SupportLevel": {
      			onChange: "saveButtonVisible"
			},
			
			
			
			SelectedItems: {
    			dataValueType: Terrasoft.DataValueType.COLLECTION,
    			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
  			},
			
			Engineer: {
  				dataValueType: Terrasoft.DataValueType.LOOKUP,
  				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
  				referenceSchemaName: "SysAdminUnit",
  				caption: "Инженер/Группа",
  				lookupConfig: {
    				filter: function() {
      					var filterGroup = Terrasoft.createFilterGroup();
      					filterGroup.addItem(Terrasoft.createIsNotNullFilter("Name"));
      					return filterGroup;
    				},
  				}
			},
						
			SupportLevel: {
    			dataValueType: Terrasoft.DataValueType.LOOKUP,
    			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "RoleInServiceTeam",
    			caption: "Уровень поддержки",
				lookupConfig: {
    				filter: function() {
      					var filterGroup = Terrasoft.createFilterGroup();
      					filterGroup.addItem(Terrasoft.createIsNotNullFilter("Name"));
      					return filterGroup;
    				},
  				}
  			},
		

		},
		messages: {
			"DataFromModal": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {
			init: function(callback, scope) {
  				this.callParent(arguments);
  				console.log("selectedItems:", this.get("selectedItems"));
			},
			
			onRender: function() {
  				
			},		
			
			onCloseButtonClick: function() {
				ModalBox.close();
			},
			
			saveButtonVisible: function() {
        		this.set("isSaveButtonVisible", true);
      		},
			
			onSaveButtonClick: function() {
    			var selectedItems = this.get("selectedItems");
    				if (selectedItems) {			
						var fields = {};
						if (this.get("Status") !== undefined) {
      						fields.status = this.get("Status").value;
   						}
						
						fields.displayOnPortal = this.get("INKDisplayOnPortal");
						
						if (this.get("ReactionTimeUnit") !== undefined) {
      						fields.reactionTimeUnit = this.get("ReactionTimeUnit").value;
   		 				}
						
						if (this.get("ReactionTimeValue") != 0) {
      						fields.reactionTimeValue = this.get("ReactionTimeValue");
   		 				}
						
						if (this.get("SolutionTimeUnit") !== undefined) {
      						fields.solutionTimeUnit = this.get("SolutionTimeUnit").value;
   						}
						
						if (this.get("SolutionTimeValue") != 0) {
      						fields.solutionTimeValue = this.get("SolutionTimeValue");
   						}
						
						if (this.get("INKMatchingTime") != 0) {
      						fields.matchingTime = this.get("INKMatchingTime");
   						}
						
						if (this.get("INKClarificationTime") != 0) {
      						fields.clarificationTime = this.get("INKClarificationTime");
   						}
						
						if (this.get("INKClosingTime") != 0) {
      						fields.closingTime = this.get("INKClosingTime");
   						}
						
						if (this.get("G3CServiceTotal_Sla") != 0) {
      						fields.serviceTotal_Sla = this.get("G3CServiceTotal_Sla");
   						}
						
						if (this.get("G3CServiceTotal_Exectime") != 0) {
      						fields.serviceTotal_Exectime = this.get("G3CServiceTotal_Exectime");
   						}
						
						if (this.get("Engineer") !== undefined) {
      						fields.engineer = this.get("Engineer");
   						}
						
						if (this.get("SupportLevel") !== undefined) {
      						fields.supportLevel = this.get("SupportLevel");
   						}
						
						var self = this;
						ServiceHelper.callService("ServiceItemEditHandler", "UpdateServiceItemsWithParams", function() {
							//this.updateIsSubscribed(true);
						}, 
												  
						{
							items: selectedItems,
							fields: fields
						}, this);
    				}
				ModalBox.close();
			},
			//для работы фильтров в модальном окне
			onListPrepare: function (filterGroup, filter, list, callback, scope) {
          		if (list) {
            		list.clear();
          		}
          		var config = {
            		columnName: callback,
            		filterValue: filter,
            		isLookupEdit: true,
            		list: list,
            		objects: {}
          		};
          		var esq = this.getCustomLookupQuery(filterGroup, callback);
          		esq.getEntityCollection(function (result) {
            		this.getLookupDataCallback(config, result);
          		}, this);
        	},
			
			//для работы фильтров в модальном окне
			getCustomLookupQuery: function (filterValue, columnName) {
          		this.abortLoadLookupDataRequest(columnName);
          		var column = this.getColumnByName(columnName);
          		var queryConfig = this.getLookupQueryConfig(column);
          		var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", queryConfig);
          		this.addLookupQueryColumns(entitySchemaQuery, columnName);
          		entitySchemaQuery.filters.add(filterValue);
          		return entitySchemaQuery;
        	},
					
			
		},
		diff: [
			
				{
  					"operation": "insert",
  					"parentName": "MyContainer",
  					"propertyName": "items",
  					"name": "MyLabel",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.LABEL,
    					"caption": "Массовое редактирование сервисов",
    					"classes": {
      					"labelClass": ["my-modal-label"]
    					},
  					},
  					"index": 1
				},

				{
  					"operation": "insert",
  					"parentName": "MyContainer",
  					"propertyName": "items",
  					"name": "CloseButton",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.BUTTON,
    					"click": {bindTo: "onCloseButtonClick"},
    					"markerValue": "CloseButton",
    					"caption": "Отмена",
    					"layout": { "column": 0, "row": 2, "colSpan": 1 }
  					},
  					"index": 2
				},
			
				{
  					"operation": "insert",
  					"parentName": "MyContainer",
 			 		"propertyName": "items",
 	 				"name": "SaveButton",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.BUTTON,
	  					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
    					"caption": "Сохранить",
						"layout": { "column": 15, "row": 2, "colSpan": 1 },
    					"click": {
     				 		"bindTo": "onSaveButtonClick"
    					},
    					"visible": {
      						"bindTo": "isSaveButtonVisible"
    					},
  					},
  					"index": 2
				},

				{
  					"operation": "insert",
  					"name": "Status",
  					"values": {
    					"layout": {
      						"colSpan": 15,
							"rowSpan": 1,
      						"column": 0,
      						"row": 0
    					},
    				"bindTo": "Status",
    				"contentType": this.Terrasoft.ContentType.ENUM,

  					},
  					"parentName": "MyGridContainer",
  					"propertyName": "items",
  					"index": 0
				},

				{
  					"operation": "insert",
  					"parentName": "MyGridContainer",
  					"propertyName": "items",
  					"name": "INKDisplayOnPortal4fbc7c46-d202-4c3c-9dc1-9a96f60662f9",
  					"values": {
    					"bindTo": "INKDisplayOnPortal",
    					"layout": {"column": 0, "row": 1, "colSpan": 10}
 					 },
	  					"index": 1
				},
			
				{
					"operation": "insert",
					"name": "ReactionTimeUnit",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 15,
							"rowSpan": 1
						},
						"bindTo": "ReactionTimeUnit",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
					"index": 2
				},
			
							{
					"operation": "insert",
					"name": "SolutionTimeUnit",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 15,
							"rowSpan": 1
						},
						"bindTo": "SolutionTimeUnit",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
					"operation": "insert",
					"name": "INKMatchingTimee7855e07-21c8-41b1-8cc2-bb485f192de2",
					"values": {
						"layout": {
							"colSpan": 15,
							"rowSpan": 1,
							"column": 0,
							"row": 4,
							"layoutName": "Tab1e654712TabLabel_gridLayout"
						},
						"bindTo": "INKMatchingTime",
						"tip": {
							"content": {
								"bindTo": "Resources.Strings.INKMatchingTimee7855e0721c841b18cc2bb485f192de2Tip"
							}
						},
						"enabled": true
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
					"operation": "insert",
					"name": "INKClarificationTime3a3b48e3-9094-44a8-aaed-d7fa9c5041da",
					"values": {
						"layout": {
							"colSpan": 15,
							"rowSpan": 1,
							"column": 0,
							"row": 5,
							"layoutName": "Tab1e654712TabLabel_gridLayout"
						},
						"bindTo": "INKClarificationTime",
						"tip": {
							"content": {
								"bindTo": "Resources.Strings.INKClarificationTime3a3b48e3909444a8aaedd7fa9c5041daTip"
							}
						},
						"enabled": true
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
					"operation": "insert",
					"name": "INKClosingTime205043a5-4961-4a99-a35e-87df754b5155",
					"values": {
						"layout": {
							"colSpan": 15,
							"rowSpan": 1,
							"column": 0,
							"row": 6,
							"layoutName": "Tab1e654712TabLabel_gridLayout"
						},
						"bindTo": "INKClosingTime"
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				{
						"operation": "insert",
						"name": "Engineer",
						"caption": "Инженер/Группа",
						"values": {
							"layout": {
								"colSpan": 15,
								"rowSpan": 1,
								"column": 0,
								"row": 7,
								"layoutName": "Header"
							},
							"contentType": Terrasoft.ContentType.ENUM,
						},
						"parentName": "MyGridContainer",
						"propertyName": "items",
				},
			
				{
						"operation": "insert",
						"name": "SupportLevel",
						"values": {
							"layout": {
								"colSpan": 15,
								"rowSpan": 1,
								"column": 0,
								"row": 7,
								"layoutName": "Header"
							},
							"contentType": this.Terrasoft.ContentType.ENUM,
						},
						"parentName": "MyGridContainer",
						"propertyName": "items",
				},
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				{
					"operation": "insert",
					"name": "G3CServiceTotal_Sla179f35c3-ea86-4a66-b64a-80ed769450f0",
					"values": {
						"layout": {
							"colSpan": 15,
							"rowSpan": 1,
							"column": 0,
							"row": 8,
							"layoutName": "Header"
						},
						"bindTo": "G3CServiceTotal_Sla"
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
					"operation": "insert",
					"name": "G3CServiceTotal_Exectime06682e5f-bc6e-49a4-a20f-ec77c5bc3327",
					"values": {
						"layout": {
							"colSpan": 15,
							"rowSpan": 1,
							"column": 0,
							"row": 9,
							"layoutName": "Header"
						},
						"bindTo": "G3CServiceTotal_Exectime"
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
					"index": 1
				},
			
				{
					"operation": "insert",
					"name": "ReactionTimeValue",
					"values": {
						"layout": {
							"colSpan": 3,
							"rowSpan": 1,
							"column": 20,
							"row": 2
						},
						"bindTo": "ReactionTimeValue",
						"labelConfig": {
							"visible": false
						}
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
					"operation": "insert",
					"name": "SolutionTimeValue",
					"values": {
						"layout": {
							"colSpan": 3,
							"rowSpan": 1,
							"column": 20,
							"row": 3
						},
						"bindTo": "SolutionTimeValue",
						"labelConfig": {
							"visible": false
						}
					},
					"parentName": "MyGridContainer",
					"propertyName": "items",
				},
			
				{
  					"operation": "insert",
  					"name": "RedRectangle",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.CONTAINER,
    					"items": [],
    					"layout": {
      						"column": 23,
      						"row": 0,
      						"colSpan": 1,
      						"rowSpan": 1
    					},
    					"classes": {
      						"wrapClassName": ["red-rectangle"]
    					}
  					},
  					"parentName": "MyContainer",
  					"propertyName": "items",
  					"index": 0
				},
			
				{
  					"operation": "insert",
  					"name": "TextWarningLabel",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.LABEL,
    					"caption": "Внимание!",
    					"classes": {
      						"labelClass": ["text-label"]
    					}
  					},
 	 				"parentName": "RedRectangle",
  					"propertyName": "items",
  					"index": 0
				},
			
				{
  					"operation": "insert",
  					"name": "TextWarningLabel2",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.LABEL,
    					"caption": "При редактировании нескольких сервисов, все внесенные изменения отразятся сразу на всех выбранных сервисах.",
    					"classes": {
      						"labelClass": ["text-label"]
    					}
  					},
  					"parentName": "RedRectangle",
  					"propertyName": "items",
  					"index": 1
				},


				{
  					"operation": "insert",
  					"parentName": "MyContainer",
  					"propertyName": "items",
  					"name": "MyGridContainer",
  					"values": {
    					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
    					"items": []
  					},
  					"index": 4
				}
		]
	};
});
