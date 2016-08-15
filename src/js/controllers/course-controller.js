'use strict';

export default ['$rootScope', '$scope', '$stateParams',
    ($rootScope, $scope, $stateParams) => {
        $scope.viewName = 'CourseController'
        console.log($stateParams)
    }];