(function () {
    'use strict';
    /*****
     *
     * data:{
     *  colList:[{
     *      名称
     *  },{
     *      负责人
     *  },{
     *      开始时间
     *  }],
     *  rowList:[{
     *      name:'a'
     *  }]
     * }
     *
     *
     *
     *
     *
     *
     *
     */
    angular.module('gantt', ['gantt.tpl'])
        .directive('gantt', [function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: "gantt/gantt.html",
                controller: ['$scope', '$element', 'ganttService', function ($scope, $element, ganttService) {
                    var listWidth = 240;
                    var vm = $scope.vm = {
                        listWidth: 240,
                        rowHeight: 50,
                        colWidth: 80,
                        headerHeight: 0,
                        listCss: {
                            width: listWidth + 'px'
                        },
                        listColTextStartX: 30,
                        listRowTextStartX: 30,
                        list: {
                            colList: [{
                                name: "name",
                                display_name: '名称',
                                isStrong: true
                            }, {
                                name: 'charger',
                                display_name: "负责人"
                            }, {
                                name: 'start',
                                display_name: "开始时间"
                            }],
                            rowList: [{
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-1'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-2'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-3'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-4'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-1'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-2'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-3'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-4'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-1'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-2'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-3'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-4'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-1'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-2'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-3'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-4'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-1'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-2'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-3'
                            }, {
                                name: '任务一',
                                charger: '马传佳',
                                start: '2017-1-4'
                            }]
                        },
                        pageX: 0,
                        flag: false,
                        type: 'day'
                    };
                    vm.mouseDown = function (ev) {
                        vm.flag = true;
                        vm.pageX = ev.pageX;
                    };
                    vm.mouseMove = function (ev) {
                        if (vm.flag) {
                            vm.listWidth = vm.listWidth + (ev.pageX - vm.pageX);
                            if (vm.listWidth >= 600) {
                                vm.listWidth = 600;
                                vm.flag = false;
                            }
                            vm.listCss.width = vm.listWidth + 'px';
                            vm.pageX = ev.pageX;
                        }

                    };
                    vm.mouseUp = function (ev) {
                        vm.pageX = ev.pageX;
                        vm.flag = false;
                    };

                    function initList() {

                        vm.listWidth = vm.list.colList.length * vm.colWidth + 30
                        vm.listCss = {
                            width: vm.listWidth + 'px'
                        };


                        _.forEach(vm.list.colList, function (n, index) {
                            n.x = vm.listColTextStartX + index * vm.colWidth;
                            n.y = vm.headerHeight / 2 + 7;
                        });
                        _.forEach(vm.list.rowList, function (n, index) {
                            n.rectX = 0;
                            n.rectY = vm.headerHeight + index * vm.rowHeight;
                            n.rectWidth = '100%';
                            n.rectHeight = vm.rowHeight;

                            n.x1 = 0;
                            n.y1 = n.rectY + vm.rowHeight;
                            n.x2 = vm.listWidth;
                            n.y2 = n.rectY + vm.rowHeight;


                            n.textX = vm.listRowTextStartX;
                            n.textY = n.rectY + 30;
                        });

                    }

                    function initMap() {
                        switch (vm.type) {
                            case 'day':
                                vm.mapHeader = {
                                    x: 0,
                                    y: 0,
                                    x1: 0,
                                    y1: vm.headerHeight,
                                    y2: vm.headerHeight,
                                    height: vm.headerHeight,
                                    colWidth: 80,
                                    title: moment().format('YY-MM-DD'),
                                    cols: []
                                };

                                for (var i = 0; i < 24; i++) {
                                    vm.mapHeader.cols.push(i + ":00");
                                }
                                break;
                            case 'month':
                                alert('month');
                                break;
                            case 'year':
                                alert('year');
                                break;
                            default:
                                break
                        }
                    }

                    function init() {
                        initList();
                        initMap();
                    }

                    init();
                }]
            };
        }])
        .service('ganttService', [function () {

        }]);
}());


angular.module("gantt.tpl", []).run(["$templateCache", function($templateCache) {$templateCache.put("gantt/gantt.html","<!--ng-mousedown=\"vm.mouseDown($event)\" ng-mousemove=\"vm.mouseMove($event)\" ng-mouseup=\"vm.mouseUp($event)\"-->\r<div class=\"gantt-wrap\">\r    <div class=\"gantt-list\" ng-style=\"vm.listCss\">\r        <div class=\"gantt-header\" ng-style=\"vm.listCss\">\r            <table class=\"gantt-header-table\">\r            <tr>\r            <td ng-repeat=\"text in vm.list.colList\">\r            {{text.display_name}}\r            </td>\r            </tr>\r            </table>\r        </div>\r        <div class=\"gantt-list-svg-wrap\">\r            <svg class=\"gantt-list-svg\"\r            ng-style=\"{width:vm.listWidth + \'px\',height:(vm.list.rowList.length * vm.rowHeight + vm.header.height) + \'px\'}\">\r            <g ng-repeat=\"row in vm.list.rowList\">\r            <rect class=\"gantt-row\"\r            ng-attr-x=\"{{row.rectX}}\"\r            ng-attr-y=\"{{row.rectY}}\"\r            ng-attr-width=\"{{row.rectWidth}}\"\r            ng-attr-height=\"{{row.rectHeight}}\"></rect>\r\r            <line class=\"row-line\"\r            ng-attr-x1=\"{{row.x1}}\"\r            ng-attr-y1=\"{{row.y1}}\"\r            ng-attr-x2=\"{{vm.listWidth}}\"\r            ng-attr-y2=\"{{row.y2}}\">\r            </line>\r\r            <text ng-repeat=\"col in vm.list.colList track by $index\"\r            ng-attr-x=\"{{row.textX + $index*80}}\"\r            ng-attr-y=\"{{row.textY}}\"\r            class=\"rol-text\" ng-class=\"{\'true\':\'rol-strong\',false:\'\'}[col.isStrong]\">{{row[col.name]}}\r            </text>\r            </g>\r            </svg>\r        </div>\r    </div>\r    <div class=\"gantt-split\"></div>\r    <div class=\"gantt-map\">\r        <div class=\"gantt-header\" ng-style=\"{width:vm.mapHeader.cols.length * vm.colWidth + \'px\'}\">\r            <table class=\"gantt-header-table\">\r            <tr>\r            <td colspan=\"{{vm.mapHeader.cols.length}}\">\r            {{vm.mapHeader.title}}\r            </td>\r            </tr>\r            <tr>\r            <td ng-repeat=\"col in vm.mapHeader.cols track by $index\">\r            {{col}}\r            </td>\r            </tr>\r            </table>\r        </div>\r        <div class=\"gantt-map-svg-wrap\">\r            <svg class=\"gantt-map-svg\"\r            ng-style=\"{width:vm.mapHeader.cols.length * vm.mapHeader.colWidth + \'px\',height:(vm.list.rowList.length * vm.rowHeight + vm.mapHeader.height) + \'px\'}\">\r            <g ng-repeat=\"row in vm.list.rowList\">\r            <rect class=\"gantt-row\"\r            ng-attr-x=\"{{row.rectX}}\"\r            ng-attr-y=\"{{row.rectY}}\"\r            ng-attr-width=\"{{row.rectWidth}}\"\r            ng-attr-height=\"{{row.rectHeight}}\"></rect>\r\r            <line class=\"row-line\"\r            ng-attr-x1=\"{{row.x1}}\"\r            ng-attr-y1=\"{{row.y1}}\"\r            ng-attr-x2=\"100%\"\r            ng-attr-y2=\"{{row.y2}}\">\r            </line>\r            </g>\r            </svg>\r        </div>\r    </div>\r</div>\r\r\r\r\r\r\r\r");}]);