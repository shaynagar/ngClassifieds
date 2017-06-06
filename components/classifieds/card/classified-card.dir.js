(function () {

    "use strict";

    angular
        .module("ngClassifieds")
        .directive("classifiedCard", function () {
            return {
                templateUrl: "components/classifieds/card/classified-card.tpl.html",
                scope: {
                    classifieds: "=",
                    classifiedsFilter: "=",
                    category: "="
                },
                controller: classifiedCardController,
                controllerAs: "vm"
            }

            function classifiedCardController($state, $scope, $mdDialog) {

                var vm = this;
                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;

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
            }
        })
})();