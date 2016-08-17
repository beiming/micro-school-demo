'use strict';

import {Course, Video, Banner} from '../models/Model'

export default ['$rootScope', '$scope', '$state',
    ($rootScope, $scope, $state) => {
        $scope.viewName = 'HomeController';
        $scope.inited = false;
        $rootScope.pageTitle = '微课';

        $scope.$on('$viewContentLoaded', () => {
            let currentStateName = $state.current.name;
            if(currentStateName === 'home.course-list') {
                if($state.params.public === 'true') {
                    $rootScope.pageTitle = '专题课程';
                }
                else {
                    $rootScope.pageTitle = '校本课程';
                }
            }
            else if(currentStateName === 'home.video-list') {
                $rootScope.pageTitle = '微视频';
            }
            else {
                $rootScope.pageTitle = '微课';
            }
        });

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