'use strict';

export default ['$scope',
    ($scope) => {
        $scope.viewName = 'IndexOrgController';

        var init = () => {
            $scope.courses = $scope.allCourses.filter(course => course.org && course.show_index).reverse().slice(0, 8);
            $scope.setBanners($scope.allBanners.filter(banner => banner.org), true);
            $scope.$apply();
        };

        $scope.initIndex().then(init);
    }];