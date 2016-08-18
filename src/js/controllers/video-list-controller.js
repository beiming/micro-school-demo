'use strict';

export default ['$scope', '$timeout',
    ($scope, $timeout) => {
        $scope.viewName = 'VideoListController';

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

        $scope.onFilterChange = () => {
            $scope.videoByKnowledgePoint = Object.assign({}, $scope.videoByKnowledgePointOrigin);
            for(let knowledge in $scope.videoByKnowledgePoint) {
                let filteredResult = $scope.videoByKnowledgePoint[knowledge].filter(filterVideo);
                if(filteredResult.length === 0) {
                    delete $scope.videoByKnowledgePoint[knowledge];
                }
                else {
                    $scope.videoByKnowledgePoint[knowledge] = filteredResult;
                }
            }
        };

        var filterVideo = (video) => {
            return ($scope.ui.selectedGrade.id == 0 || $scope.ui.selectedGrade.name === video.grade)
                && ($scope.ui.selectedSubject.id == 0 || $scope.ui.selectedSubject.name === video.subject);
        };

        var init = () => {
            $scope.ui = {};
            $scope.ui.grades = getFilterTypeDict($scope.allVideos, 'grade');
            $scope.ui.subjects = getFilterTypeDict($scope.allVideos, 'subject');

            $scope.ui.selectedGrade = $scope.ui.grades[0];
            $scope.ui.selectedSubject = $scope.ui.subjects[0];

            $scope.videoByKnowledgePointOrigin = $scope.allVideos.reduce((knowledgeObj, video) => {
                if(knowledgeObj.hasOwnProperty(video.knowledge_point)) {
                    knowledgeObj[video.knowledge_point].push(video);
                }
                else {
                    knowledgeObj[video.knowledge_point] = [video]
                }
                return knowledgeObj;
            }, {});
            $scope.onFilterChange();
            $scope.$apply();
        };
        $scope.initDataPromise.then(init);
    }];