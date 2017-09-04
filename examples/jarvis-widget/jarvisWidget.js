angular.module('jarviswidget', [])
	.directive('widgetGrid',['$timeout', '$rootScope',
	                         function($timeout, $rootScope) {
		return {
			restrict: 'AE',
			priority:  0,
			link: function(scope, element, attrs) {
					if ($.fn.jarvisWidgets) {
						if($(element).length == 0) {
							//console.log("no element match for jarvisWidget");
							return;
						}
						element.jarvisWidgets({
							grid : 'article',
							widgets : '.jarviswidget',
							localStorage : true,
							deleteSettingsKey : '#deletesettingskey-options',
							settingsKeyLabel : 'Reset settings?',
							deletePositionKey : '#deletepositionkey-options',
							positionKeyLabel : 'Reset position?',
							sortable : true,
							buttonsHidden : false,
							// toggle button
							toggleButton : true,
							toggleClass : 'fa fa-minus | fa fa-plus',
							toggleSpeed : 200,
							toggleTitle: function(currentEl){
							},
							onToggle : function(currentEl) {
							},
							// delete btn
							deleteButton : true,
							deleteMsg: '',
							deleteClass : 'fa fa-times',
							deleteSpeed : 200,
							deleteTooTipTitle: function(){
							},
							onDelete : function() {

							},
							// edit btn
							editButton : true,
							editPlaceholder : '.jarviswidget-editbox',
							editClass : 'fa fa-cog | fa fa-save',
							editSpeed : 200,
							onEdit : function() {
							},
							// color button
							colorButton : true,
							// full screen
							fullscreenButton : true,
							fullscreenClass : 'fa fa-expand | fa fa-compress',
							fullscreenDiff : 3,
							fullScreenTitle: function(currentEl){
							},
							onFullscreen : function(currentEl) {
								/*$(".tooltip.fade.bottom.in").css("display","none");
								var elId = currentEl.attr("id");
								if($("#jarviswidget-fullscreen-mode").length > 0) {
									$rootScope.$broadcast(elId + "-fullscreen");
									if(elId.indexOf("appTopology_")!=-1){
										$appTopologyService.fullscreen=true;
									}
								} else {

									$rootScope.$broadcast(elId + "-normalscreen");
									if(elId.indexOf("appTopology_")!=-1){
										$("#widget-id-topology .widget-body").css("display","block");
										$(currentEl).find(".jarviswidget-toggle-btn i").addClass("fa-minus");
										$(currentEl).find(".jarviswidget-toggle-btn i").removeClass("fa-plus");
										$appTopologyService.fullscreen=false;
										$("#app-depService .jarviswidget").each(function(key,value){
											//$(this).css('height', 500 + 'px')
											//$(this).find(" .widget-body").css('height', 450 + 'px')
											//console.debug("normal screen height:"+$(this).find(" .widget-body").height());
										});


									}
								}


								 var full_screen_mode_id = currentEl.parent().attr('id');
								 var lang = localize.currentLocaleData;
								 var title = full_screen_mode_id == 'jarviswidget-fullscreen-mode' ? lang.Restore : lang.Maximize;
								 currentEl.find('.jarviswidget-fullscreen-btn').attr('data-original-title', title);*/

							},
							// custom btn
							customButton : false,
							customClass : 'folder-10 | next-10',
							customStart : function() {
								alert('Hello you, this is a custom button...');
							},
							customEnd : function() {
								alert('bye, till next time...');
							},
							// order
							buttonOrder : '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
							opacity : 1.0,
							dragHandle : '> header',
							placeholderClass : 'jarviswidget-placeholder',
							indicator : true,
							indicatorTime : 600,
							ajax : true,
							timestampPlaceholder : '.jarviswidget-timestamp',
							timestampFormat : 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
							refreshButton : true,
							refreshButtonClass : 'fa fa-refresh',
							labelError : 'Sorry but there was a error:',
							labelUpdated : 'Last Update:',
							labelRefresh : 'Refresh',
							labelDelete : 'Delete widget:',
							afterLoad : function() {

							},
							rtl : false, // best not to toggle this!
							onChange : function() {
								if($(this).closest("section").length && $(this).closest("section")[0].id == "dashboard-widget") {
									// call a custom function to reset widget position
									dashboardConfigService.setWidgetPosition();
								}
							},
							onSave : function() {

							},
							ajaxnav : $.navAsAjax // declears how the localstorage should be saved (HTML or AJAX page)

						});

					}

			}
		}
	}])