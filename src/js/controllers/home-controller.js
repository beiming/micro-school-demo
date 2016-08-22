'use strict';

import {Course, Video, Banner, BaseModel} from '../models/Model'

export default ['$rootScope', '$scope', '$state', '$location',
    ($rootScope, $scope, $state, $location) => {
        $scope.viewName = 'HomeController';
        $scope.inited = false;
        $rootScope.pageTitle = '微课';

        $scope.$on('$viewContentLoaded', () => {
            let currentStateName = $state.current.name;
            if (currentStateName === 'home.course-list') {
                if ($state.params.public === 'true') {
                    $rootScope.pageTitle = '专题课程';
                }
                else {
                    $rootScope.pageTitle = '校本课程';
                }
            }
            else if (currentStateName === 'home.video-list') {
                $rootScope.pageTitle = '微视频';
            }
            else {
                $rootScope.pageTitle = '微课';
            }
        });

        var getConfigData = () => {
            return new Promise((resolve, reject) => {
                fetch(`data/config.json?v=${Math.random()}`)
                    .then(response => response.json())
                    .then(json => {
                        if(!json.error) {
                            $rootScope.config = json;
                        }
                        else{
                            $rootScope.config = {host: '', version: Math.random()}
                        }
                        resolve();
                    })
                    .catch(() => {
                        $rootScope.config = {host: '', version: Math.random()}
                        resolve();
                    });
            });
        };

        var getJSONData = () => {
            BaseModel.RESOURCE_HOST = $rootScope.config.host;
            BaseModel.VERSION_NUMBER = $rootScope.config.version;

            return fetch(`data/data.json?v=${$rootScope.config.version}`)
                .then(response => response.json())
                .then(json => {
                    if(!json.error) {
                        if (json.hasOwnProperty('courses'))
                            $scope.allCourses = json['courses'].map(json => new Course(json));
                        if (json.hasOwnProperty('videos'))
                            $scope.allVideos = json['videos'].map(json => new Video(json));
                        if (json.hasOwnProperty('banners'))
                            $scope.allBanners = json['banners'].map(json => new Banner(json));
                    }
                    else {
                        $scope.allCourses = $scope.allVideos = $scope.allBanners = [];
                    }
                });
        };

        var promiseResolve = (resolve) => {
            return () => {
                $scope.inited = true;
                resolve();
            }
        };

        $scope.playVideo = (video) => {
            $location.path(video.url);
        };


        var init = () => {
            $scope.allCourses = [];
            $scope.allVideos = [];
            $scope.allBanners = [];
            $scope.initDataPromise = new Promise((resolve, reject) => {
                getConfigData().then(() => getJSONData().then(promiseResolve(resolve)).catch(promiseResolve(resolve)))
            });
        };

        init();
    }];