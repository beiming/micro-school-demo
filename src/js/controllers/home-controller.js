'use strict';

export default ['$rootScope', '$scope',
    ($rootScope, $scope) => {
        $scope.viewName = 'HomeController';
        fetch('data/data.json')
            .then(response => response.json())
            .then(json => console.log(json));
    }];