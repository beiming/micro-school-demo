'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'CourseController';
        $stateParams.courseId = parseInt($stateParams.courseId);
        const TAB_NAMES = ['content', 'outline', 'review'];
        $scope.ui = {};
        $scope.ui.tabName = TAB_NAMES[0];

        $scope.range = (start, stop, step=1) => {
            var arr = [];
            if(start === stop || step === 0) {
                return arr;
            }
            if((start < stop && step < 0) || (start > stop && step > 0)) {
                return arr;
            }
            if(step > 0) {
                for (let i = start; i < stop; i += step) {
                    arr.push(i);
                }
            }
            else {
                for (let i = start; i > stop; i += step) {
                    arr.push(i);
                }
            }
            return arr;
        };

        var setStartStyle = () => {
            var courseAverageStar = $scope.course.showRatings / 2;
            $scope.ui.starStyleArr = [];
            for (var i = 1; i <= 5; i += 1) {
                var state = 'empty';
                if(i <= courseAverageStar) {
                    state = 'whole';
                }
                else if(i -1 < courseAverageStar) {
                    state = 'half';
                }
                $scope.ui.starStyleArr.push(`icon-${state}-star`);
            }

        };

        var init = () => {
            $scope.course = $scope.allCourses.find((course) => course.id === $stateParams.courseId);
            if($scope.course) {
                $scope.course.calculateCourseRatings();
                setStartStyle();
            }
            $scope.$apply();
        };

        $scope.onClickTab = (tabName) => {
            if(TAB_NAMES.indexOf(tabName) == -1) {
                tabName = 'content'
            }
            $scope.ui.tabName = tabName;
        };

        $scope.initDataPromise.then(init);
    }];