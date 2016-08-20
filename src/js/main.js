'use strict';

var lms = angular.module('lms', []);

import HomeController from './controllers/home-controller';
import IndexController from './controllers/index-controller';
import IndexPublicController from './controllers/index-public-controller';
import IndexOrgController from './controllers/index-org-controller';
import CourseListController from './controllers/course-list-controller';
import VideoListController from './controllers/video-list-controller';
import CourseController from './controllers/course-controller';
import PlayerController from './controllers/player-controller'
import * as Filter from './filters'

angular
    .module('lms', ['ui.router'])
    .filter('formatCount', Filter.formatCount)
    .filter('formatDuration', Filter.formatDuration)
    .controller('HomeController', HomeController)
    .controller('IndexPublicController', IndexPublicController)
    .controller('IndexOrgController', IndexOrgController)
    .controller('CourseListController', CourseListController)
    .controller('VideoListController', VideoListController)
    .controller('CourseController', CourseController)
    .config(['$sceDelegateProvider', ($sceDelegateProvider) => {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://oc3tytxf2.bkt.clouddn.com/**'
        ]);
    }])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/home/index/public');
        $stateProvider
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'partials/home.html',
                controller: HomeController
            })
            .state('home.index', {
                url: '/index',
                templateUrl: 'partials/index.html',
                abstract: true,
                controller: IndexController
            })
            .state('home.index.public', {
                url: '/public',
                templateUrl: 'partials/index-public.html',
                controller: IndexPublicController
            })
            .state('home.index.org', {
                url: '/org',
                templateUrl: 'partials/index-org.html',
                controller: IndexOrgController
            })
            .state('home.course-list', {
                url: '/course-list?public&org&hot&speed_class&super_teacher',
                templateUrl: 'partials/course-list.html',
                controller: CourseListController
            })
            .state('home.video-list', {
                url: '/video-list?public',
                templateUrl: 'partials/video-list.html',
                controller: VideoListController
            })
            .state('home.courses', {
                url: '/courses/:courseId',
                templateUrl: 'partials/course.html',
                controller: CourseController,
            })
            .state('home.play', {
                url: '/play/:videoId',
                templateUrl: 'partials/player.html',
                controller: PlayerController,
            })
    }]);

