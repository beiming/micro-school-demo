'use strict';

export default ['$rootScope', '$scope',
    ($rootScope, $scope) => {
        $scope.viewName = 'IndexController';

        var init = () => {
            $scope.banners = $scope.allBanners.filter((banner) => banner.public).sort((a, b) => a.index - b.index);
        };
        $scope.initPromise.then(init);
    }];