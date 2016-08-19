'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'CourseController';
        $stateParams.courseId = parseInt($stateParams.courseId);
        const TAB_NAMES = ['content', 'outline', 'review'];
        $scope.ui = {};
        $scope.ui.tabName = TAB_NAMES[0];

        var init = () => {
            $scope.course = $scope.allCourses.find((course) => course.id === $stateParams.courseId);
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