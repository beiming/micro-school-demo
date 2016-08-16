'use strict';

import {Course, Video, Banner} from '../models/Model'

export default ['$scope',
    ($scope) => {
        $scope.viewName = 'HomeController';
        $scope.inited = false;

        var getJSONData = () => {
            return fetch('data/data.json')
                .then(response => response.json())
                .then(json => {
                    if (json.hasOwnProperty('courses'))
                        $scope.allCourses = json['courses'].map(json => new Course(json));
                    if (json.hasOwnProperty('videos'))
                        $scope.allVideos = json['videos'].map(json => new Video(json));
                    if (json.hasOwnProperty('banners'))
                        $scope.allBanners = json['banners'].map(json => new Banner(json));
                });
        };

        var promiseResolve = (resolve) => {
            return () => {
                $scope.inited = true;
                resolve();
            }
        };


        var init = () => {
            $scope.allCourses = [];
            $scope.allVideos = [];
            $scope.allBanners = [];
            $scope.initDataPromise = new Promise((resolve, reject) => {
                getJSONData().then(promiseResolve(resolve)).catch(promiseResolve(resolve))
            });
        };

        init();
    }];