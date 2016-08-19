'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'CourseController';
        $stateParams.courseId = parseInt($stateParams.courseId);

        var init = () => {
            $scope.course = $scope.allCourses.find((course) => course.id === $stateParams.courseId);
            $scope.$apply();
        };

        $scope.initDataPromise.then(init);
    }];