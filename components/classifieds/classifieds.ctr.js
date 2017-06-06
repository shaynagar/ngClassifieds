(function () {

    "use-strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            
            var vm = this;

            vm.classified;
            vm.classifieds;
            vm.categories;
            vm.editing;

            vm.openSidenav = openSidenav;

            getClassifieds();
            
            function getClassifieds() {
                classifiedsFactory.getClassifieds().then(function (classifieds) {
                    vm.classifieds = classifieds.data.Data;
                    vm.categories = getCategories(vm.classifieds);
                });
            }

            $scope.$on('newClassified', function (event, classified) {
                getClassifieds();
                showToast('Classified Saved!');
            });

            $scope.$on('editSaved', function (event, message) {
                getClassifieds();
                showToast(message);
            });

            function openSidenav() {
                $state.go('classifieds.new');
            }

            

            

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }

            function getCategories(classifieds) {
                var categories = [];

                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();