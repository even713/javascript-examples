
angular.module("uilaDatatable", ['ngSanitize'])

.directive("uilaTable", UilaTableDirective.create())

.directive("uilaColumn", UilaColumnDirective.create())

.directive("uilaColumnTitle", UilaColumnTitleDirective.create());

