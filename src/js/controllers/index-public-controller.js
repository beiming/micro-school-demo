'use strict';

export default ['$rootScope', '$scope', '$timeout',
    ($rootScope, $scope, $timeout) => {
        $scope.viewName = 'IndexPublicController';

        var initSwaper = () => {
            new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                // autoplay: 3000,
                // If we need pagination
                pagination: '.swiper-pagination',
            })
        };

        var init = () => {
            $scope.banners = $scope.allBanners.filter((banner) => banner.public).sort((a, b) => a.index - b.index);
            $scope.courses = $scope.allCourses.filter((course) => course.public && course.hot);
            $scope.videos = $scope.allVideos.filter((video) => video.public && video.hot);
            $scope.$apply();
            $timeout(initSwaper);
        };
        $scope.initPromise.then(init);
    }];