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
            vm.editClassified = editClassified;
            vm.deleteClassified = deleteClassified;

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

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function () {
                    classifiedsFactory.deleteClassified(classified.id).then(function (data) {
                        alert(data.data.Data)
                        if (data.data.Data == "Success") {
                            var index = vm.classifieds.indexOf(classified);
                            vm.classifieds.splice(index, 1);
                            showToast("Classified Deleted");
                        }
                    });
                }, function () { });
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