'use strict';

export default ['$scope',
    ($scope) => {
        $scope.viewName = 'IndexPublicController';
        const SHOW_INDEX_MAX_COUNT = 4;

        var init = () => {

            var filterObject = (course) => course.public && course.show_index;

            $scope.hotCourses = $scope.allCourses.filter(course => filterObject(course) && course.hot).slice(0, SHOW_INDEX_MAX_COUNT);
            $scope.speedCourses = $scope.allCourses.filter(course => filterObject(course) && course.speed_class).slice(0, SHOW_INDEX_MAX_COUNT);
            $scope.superTeacherCourses = $scope.allCourses.filter(course => filterObject(course) && course.super_teacher).slice(0, SHOW_INDEX_MAX_COUNT);

            $scope.videos = $scope.allVideos.filter(video => video.public && video.show_index).slice(0, 4);
            $scope.setBanners($scope.allBanners.filter(banner => banner.public));
            $scope.$apply();
        };
        $scope.initIndex().then(init);
    }];