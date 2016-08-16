'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'CourseController';
        console.log($stateParams)
    }];