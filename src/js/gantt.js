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

