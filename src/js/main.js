'use strict';

var lms = angular.module('lms', []);

import HomeController from './controllers/home-controller';
import PublicCourseController from './controllers/public-course-controller';
import OrgCourseController from './controllers/org-course-controller';
import PublicCourseListController from './controllers/public-course-list-controller';
import PublicVideoListController from './controllers/public-video-list-controller';
import CourseController from './controllers/course-controller';

angular
    .module('lms', ['ui.router'])
    .controller('HomeController', HomeController)
    .controller('PublicCourseController', PublicCourseController)
    .controller('OrgCourseController', OrgCourseController)
    .controller('PublicCourseListController', PublicCourseListController)
    .controller('PublicVideoListController', PublicVideoListController)
    .controller('CourseController', CourseController)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/home/public');
        $stateProvider
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'partials/home.html',
                controller: HomeController
            })
            .state('home.public', {
                url: '/public',
                templateUrl: 'partials/public.html',
                controller: PublicCourseController
            })
            .state('home.org', {
                url: '/org',
                templateUrl: 'partials/org.html',
                controller: OrgCourseController
            })
            .state('home.public-course-list', {
                url: '/public-course-list',
                templateUrl: 'partials/public-course-list.html',
                controller: PublicCourseListController
            })
            .state('home.public-video-list', {
                url: '/public-video-list',
                templateUrl: 'partials/public-video-list.html',
                controller: PublicVideoListController
            })
            .state('home.courses', {
                url: '/courses/:courseId',
                templateUrl: 'partials/course.html',
                controller: CourseController,
            })
    }]);

