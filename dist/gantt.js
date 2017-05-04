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
                controller: ['$scope', '$element', 'ganttService','$timeout', function ($scope, $element, ganttService,$timeout) {
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
                        mapWidth:0,
                        subWidth:0,
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
                                id:1,
                                name: '任务1',
                                charger: '马传佳',
                                start: moment().startOf('day'),
                                end:moment().startOf('day').add(1,'hours')
                            }, {
                                id:2,
                                name: '任务2',
                                charger: '马传佳',
                                start: moment().startOf('day').add(1,'hours'),
                                end:moment().startOf('day').add(2,'hours')
                            }, {
                                id:3,
                                name: '任务3',
                                charger: '马传佳',
                                start: moment().startOf('day').add(1,'hours'),
                                end:moment().startOf('day').add(3,'hours')
                            }, {
                                id:4,
                                name: '任务4',
                                charger: '马传佳',
                                start: moment().startOf('day').add(2,'hours'),
                                end:moment().startOf('day').add(4,'hours')
                            }, {
                                id:5,
                                name: '任务5',
                                charger: '马传佳',
                                start: moment().startOf('day').add(2,'hours'),
                                end:moment().startOf('day').add(5,'hours')
                            }, {
                                id:6,
                                name: '任务6',
                                charger: '马传佳',
                                start: moment().startOf('day').add(9,'hours'),
                                end:moment().startOf('day').add(10,'hours')
                            }]
                        },
                        pageX: 0,
                        flag: false,
                        type: 'day'
                    };
                    vm.mouseDown = function (ev) {
                        if(ev.target.className === 'gantt-split'){
                            vm.flag = true;
                            vm.pageX = ev.pageX;
                        }
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

                    //map over

                    vm.mapOver = function(ev){
                        $('.gantt-list-row.gantt-row.active').removeClass('active')
                        var selectedElement = ev.target;
                        var _id = selectedElement.id + '-list';
                        $('#' + _id).addClass('active');
                        //{{row.id}}-row-list



                    };
                    vm.mapLeave = function(ev){
                        $('.gantt-list-row.gantt-row.active').removeClass('active')
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
                            //左侧list巨型
                            n.rectX = 0;
                            n.rectY = vm.headerHeight + index * vm.rowHeight;
                            n.rectWidth = '100%';
                            n.rectHeight = vm.rowHeight;

                            //左侧和右侧每一行下划线
                            n.x1 = 0;
                            n.y1 = n.rectY + vm.rowHeight;
                            n.y2 = n.rectY + vm.rowHeight;


                            //左侧list文字
                            n.textX = vm.listRowTextStartX;
                            n.textY = n.rectY + 30;




                            //右侧时间线矩形




                            n.rectLineX = (moment(n.start).format('X') - moment(n.start).startOf('day').format('X')) * vm.subWidth;
                            n.rectLineY = vm.headerHeight + index * vm.rowHeight + 20;
                            n.rectLineWidth = vm.subWidth * (moment(n.end).format('X') - moment(n.start).format('X'));
                            n.rectLineHeight = 12;



                        });

                    }

                    function initDuration() {

                    }

                    function initMap() {
                        switch (vm.type) {
                            case 'day':
                                vm.mapHeader = {
                                    title: moment().format('YY-MM-DD'),
                                    cols: []
                                };

                                for (var i = 0; i < 24; i++) {
                                    vm.mapHeader.cols.push(i + ":00");
                                }
                                vm.mapWidth = vm.mapHeader.cols.length * vm.colWidth;
                                vm.subWidth = vm.mapWidth/(60*60*24)
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





                        $timeout(function () {
                            $("#gantt-map-svg-wrap").on("scroll", function () {
                                $('#gantt-list-svg-wrap').scrollTop($(this).scrollTop());
                                $('#gantt-map-header').scrollLeft($(this).scrollLeft());
                            });
                        });
                    }

                    function init() {
                        vm.list.rowList = [];

                        for (var o = 0; o < 1000; o++){
                            vm.list.rowList.push({
                                id:o,
                                name: '任务' + o,
                                charger: '马传佳',
                                start: moment().startOf('day'),
                                end:moment().startOf('day').add(20,'hours')
                            });
                        }

                        vm.list.rowList

                        initMap();
                        initList();
                    }

                    init();
                }]
            };
        }])
        .service('ganttService', [function () {

        }])
        .filter('timeFormat', [function () {
            return function (date) {
                if (date === undefined || date === null || _.isDate(moment(date))) {
                    return date;
                }
                return moment(date).format('HH:mm'); //YYYY年MM月DD日 HH:mm
            };
        }]);
}());


angular.module("gantt.tpl", []).run(["$templateCache", function($templateCache) {$templateCache.put("gantt/gantt.html","<div class=\"gantt-wrap\" ng-mousedown=\"vm.mouseDown($event)\" ng-mousemove=\"vm.mouseMove($event)\" ng-mouseup=\"vm.mouseUp($event)\">\r    <div class=\"gantt-list\" ng-style=\"vm.listCss\">\r        <div class=\"gantt-header\" ng-style=\"vm.listCss\">\r            <table class=\"gantt-header-table\">\r                <tr>\r                    <td ng-repeat=\"text in vm.list.colList\">\r                        {{text.display_name}}\r                    </td>\r                </tr>\r            </table>\r        </div>\r        <div id=\"gantt-list-svg-wrap\" class=\"gantt-list-svg-wrap\">\r            <svg class=\"gantt-list-svg\"\r                 ng-style=\"{width:vm.listWidth + \'px\',height:(vm.list.rowList.length * vm.rowHeight + vm.headerHeight) + \'px\'}\">\r                <g ng-repeat=\"row in vm.list.rowList\">\r                    <rect class=\"gantt-list-row gantt-row\"\r                          id=\"{{row.id}}-row-list\"\r                          ng-attr-x=\"{{row.rectX}}\"\r                          ng-attr-y=\"{{row.rectY}}\"\r                          ng-attr-width=\"{{row.rectWidth}}\"\r                          ng-attr-height=\"{{row.rectHeight}}\"></rect>\r\r                    <line class=\"row-line\"\r                          ng-attr-x1=\"{{row.x1}}\"\r                          ng-attr-y1=\"{{row.y1}}\"\r                          ng-attr-x2=\"100%\"\r                          ng-attr-y2=\"{{row.y2}}\">\r                    </line>\r\r                    <text ng-repeat=\"col in vm.list.colList track by $index\"\r                          ng-attr-x=\"{{row.textX + $index*80}}\"\r                          ng-attr-y=\"{{row.textY}}\"\r                          class=\"rol-text\" ng-class=\"{\'true\':\'rol-strong\',false:\'\'}[col.isStrong]\">{{row[col.name]}}\r                    </text>\r                </g>\r            </svg>\r        </div>\r    </div>\r    <div class=\"gantt-split\"></div>\r    <div class=\"gantt-map\">\r        <div id=\"gantt-map-header\" class=\"gantt-header\">\r            <table class=\"gantt-header-table\" ng-style=\"{width:vm.mapHeader.cols.length * vm.colWidth + \'px\'}\">\r                <tr>\r                    <td colspan=\"{{vm.mapHeader.cols.length}}\">\r                        {{vm.mapHeader.title}}\r                    </td>\r                </tr>\r                <tr>\r                    <td ng-repeat=\"col in vm.mapHeader.cols track by $index\" width=\"78\">\r                        {{col}}\r                    </td>\r                </tr>\r            </table>\r        </div>\r        <div id=\"gantt-map-svg-wrap\" class=\"gantt-map-svg-wrap\">\r            <svg class=\"gantt-map-svg\"\r                 ng-mouseover=\"vm.mapOver($event)\"\r                 ng-mouseleave=\"vm.mapLeave($event)\"\r                 ng-style=\"{width:vm.mapHeader.cols.length * vm.colWidth + \'px\',height:(vm.list.rowList.length * vm.rowHeight + vm.headerHeight) + \'px\'}\">\r                <g ng-repeat=\"row in vm.list.rowList\">\r                    <rect class=\"gantt-row\"\r                          id=\"{{row.id}}-row\"\r                          ng-attr-x=\"{{row.rectX}}\"\r                          ng-attr-y=\"{{row.rectY}}\"\r                          ng-attr-width=\"{{row.rectWidth}}\"\r                          ng-attr-height=\"{{row.rectHeight}}\"></rect>\r\r                    <line class=\"row-line\"\r                          ng-attr-x1=\"{{row.x1}}\"\r                          ng-attr-y1=\"{{row.y1}}\"\r                          ng-attr-x2=\"100%\"\r                          ng-attr-y2=\"{{row.y2}}\">\r                    </line>\r\r\r                    <rect class=\"gantt-line\"\r                          ng-attr-x=\"{{row.rectLineX}}\"\r                          ng-attr-y=\"{{row.rectLineY}}\"\r                          ng-attr-width=\"{{row.rectLineWidth}}\"\r                          ng-attr-height=\"{{row.rectLineHeight}}\"></rect>\r\r                </g>\r            </svg>\r        </div>\r    </div>\r</div>\r\r\r\r\r\r\r\r");}]);