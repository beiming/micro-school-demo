'use strict';

export default ['$rootScope', '$scope',
    ($rootScope, $scope) => {
        $scope.viewName = 'PublicCourseController';

        var init = () => {
            $scope.initPromise.then(() => {
                console.log('OK');
            })
        };

        init();
    }];