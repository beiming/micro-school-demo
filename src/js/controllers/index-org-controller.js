'use strict';

export default ['$scope',
    ($scope) => {
        $scope.viewName = 'IndexOrgController';

        var init = () => {
            $scope.courses = $scope.allCourses.filter(course => !course.public && course.hot);
            $scope.setBanners($scope.allBanners.filter(banner => !banner.public));
            $scope.$apply();
        };

        $scope.initIndex().then(init);
    }];