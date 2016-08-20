'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'PlayerController';

        var init = () => {
            $scope.video = $scope.allVideos.find(v => v.id === parseInt($stateParams.videoId));
            if (!$scope.video) {
                $scope.video = (() => {
                    for (let course of $scope.allCourses) {
                        for (let video of course.videos) {
                            if (video.id === parseInt($stateParams.videoId)) {
                                return video;
                            }
                        }
                    }
                })();
            }

            if (!$scope.video) {
                $scope.error = '没找到该视频';
            }
            $scope.$apply();
        };
        $scope.initDataPromise.then(init);
    }];