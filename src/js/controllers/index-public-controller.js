'use strict';

export default ['$scope',
    ($scope) => {
        $scope.viewName = 'IndexPublicController';
        $scope.$parent.currentViewName = 'public';

        var init = () => {
            $scope.courses = $scope.allCourses.filter(course => course.public && course.hot);
            $scope.videos = $scope.allVideos.filter(video => video.public && video.hot);
            $scope.setBanners($scope.allBanners.filter(banner => banner.public));
            $scope.$apply();
        };
        $scope.initIndex().then(init);
    }];