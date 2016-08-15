'use strict';

export default ['$rootScope', '$scope',
    ($rootScope, $scope) => {
        $scope.viewName = 'PublicCourseController';

        var init = () => {
            $scope.courses = $scope.allCourses.filter((course) => course.public && course.hot);
            $scope.banners = $scope.allBanners.filter((banner) => banner.public).sort((a, b) => a.index - b.index);
            $scope.videos = $scope.allVideos.filter((video) => video.public && video.hot);
            $scope.$apply();
        };
        $scope.initPromise.then(init);
    }];