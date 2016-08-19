'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'PlayerController';
        console.log($stateParams);

        var init = () => {
            $scope.video = $scope.allVideos.find(v => v.id === parseInt($stateParams.videoId));
            if(!$scope.video) {
                $scope.allCourses.find(c => c.videos.find(v => v.id === parseInt($stateParams.videoId)));
            }

            if(!$scope.video) {
                $scope.error = '没找到该视频';
            }
            $scope.$apply();
        };
        $scope.initDataPromise.then(init);
    }];