'use strict';

export default ['$scope', '$stateParams',
    ($scope, $stateParams) => {
        $scope.viewName = 'CourseListController';
        $stateParams.public = $stateParams.public === 'true';

        var getFilterTypeDict = (courses, filterType) => {
            var map = courses.reduce((dict, course)=> {
                if (!dict.hasOwnProperty(course[filterType])) {
                    dict[course[filterType]] = 1;
                }
                else {
                    dict[course[filterType]] += 1;
                }
                return dict;
            }, {});
            var list = Object.keys(map).sort();
            list.unshift('全部');
            map = list.map((type, index) => {
                return {id: index, name: type};
            });
            return map;
        };

        $scope.filterCourse = (course) => {
            return ($scope.ui.selectedGrade.id == 0 || $scope.ui.selectedGrade.name === course.grade)
                && ($scope.ui.selectedSubject.id == 0 || $scope.ui.selectedSubject.name === course.subject);
        };


        var init = () => {
            $scope.courses = $scope.allCourses.filter(course => course.public === $stateParams.public);
            $scope.ui = {};
            $scope.ui.grades = getFilterTypeDict($scope.courses, 'grade');
            $scope.ui.subjects = getFilterTypeDict($scope.courses, 'subject');

            $scope.ui.selectedGrade = $scope.ui.grades[0];
            $scope.ui.selectedSubject = $scope.ui.subjects[0];

            $scope.$apply();
        };
        $scope.initDataPromise.then(init)
    }];