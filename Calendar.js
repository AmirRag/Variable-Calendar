define( ["qlik",  "jquery", "css!./jquery-ui.css"],
function (qlik) {
	return {
		initialProperties : {
			version : 1.0,
			variableValue : {},
			variableName : "",
		},
	  
		definition : {
			type : "items",
			component : "accordion",
			items : {
				settings : {
					uses : "settings",
				  	items : {
						variable : {
							type : "items",
							label : "Variable",
							items : {
								name : {
									ref : "variableName",
									label : "Name",
									type : "string",
									change : function(data) {
										//create variable - ignore errors
										qlik.currApp().variable.create(data.variableName);
										data.variableValue.qStringExpression = '=' + data.variableName;
									}
								},

							}
						}
					}
				}
			}
		},
	  
		paint : function($element, layout) {
			var html = "", t = this;
			html += '<input type="button" style="width:105px; height:40px; border-radius: 25px; background-color:#eaeae1; font-weight:bold;" id="datepicker"  value="' +  layout.variableValue + '" >';
			$element.html(html).find('button').on('qv-activate', function() {
				var val = $(this).data('alt') + '';
				qlik.currApp(t).variable.setContent(layout.variableName, val);
			});
			$element.find('select, input').on('change', function() {
				var val = $(this).val() + '';
				qlik.currApp(t).variable.setContent(layout.variableName, val);
			})
			$(function() {
   				$( "#datepicker" ).datepicker({
  					dateFormat: "dd/mm/yy"
				});
 			});		
		}
	};
});
