(function () {
    "use strict";

    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function ($http, $q) {
            function getClassifieds() {
                return $http.get("http://localhost:2583/api/items");
            }

            function addClassified(item) {
                var defer = $q.defer();
                $http({
                    url: 'http://localhost:2583/api/items',
                    method: 'POST',
                    data: JSON.stringify(item)
                }).then(function (successData) {
                    defer.resolve(successData);
                }, function (errorData) {
                    defer.reject(errorData);
                });
                return defer.promise;
            }

            function editClassified(id, classified) {
                var defer = $q.defer();
                $http({
                    url: 'http://localhost:2583/api/items/' + id,
                    method: 'PUT',
                    data: JSON.stringify(classified)
                }).then(function (successData) {
                    defer.resolve(successData);
                }, function (errorData) {
                    defer.reject(errorData);
                });
                return defer.promise;
            }

            function deleteClassified(id) {
                var defer = $q.defer();
                $http({
                    url: 'http://localhost:2583/api/items/' + id,
                    method: 'DELETE',
                }).then(function (successData) {
                    defer.resolve(successData);
                }, function (errorData) {
                    defer.reject(errorData);
                });
                return defer.promise;
            }

            return {
                getClassifieds: getClassifieds,
                addClassified: addClassified,
                editClassified: editClassified,
                deleteClassified: deleteClassified
            }
        });
})();