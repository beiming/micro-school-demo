'use strict';

import {Course, Video, Banner} from '../models/Model'

export default ['$rootScope', '$scope',
    ($rootScope, $scope) => {
        $scope.viewName = 'HomeController';

        var getJSONData = () => {
            return fetch('data/data.json')
                .then(response => response.json())
                .then(json => {
                    $scope.courses = [];
                    $scope.videos = [];
                    $scope.banners = [];
                    if (json.hasOwnProperty('courses'))
                        $scope.courses = json['courses'].map(json => new Course(json));
                    if (json.hasOwnProperty('videos'))
                        $scope.videos = json['courses'].map(json => new Video(json));
                    if (json.hasOwnProperty('banners'))
                        $scope.banners = json['courses'].map(json => new Banner(json));
                })
                .catch(() => {
                    $scope.courses = [];
                    $scope.videos = [];
                    $scope.banners = [];
                });
        };

        var init = () => {
            $scope.initPromise = new Promise((resolve, reject) => {
                getJSONData().then(() => resolve()).catch(()=>resolve)
            });
        };

        init();
    }];