'use strict';

export default ['$scope', '$timeout',
    ($scope, $timeout) => {
        $scope.viewName = 'IndexController';

        var initSwaper = () => {
            new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                pagination: '.swiper-pagination',
            });
        };

        $scope.setBanners = (banners, reverse=false) => {
            $scope.banners = banners.sort((a, b) => {
                if(reverse){
                    return b.index - a.index;
                }
                else {
                    return a.index - b.index;
                }
            });
            $timeout(initSwaper);
        };

        $scope.initIndex = () => {
            $scope.banners = [];
            return $scope.initDataPromise;
        };

        $scope.initIndex();
    }];