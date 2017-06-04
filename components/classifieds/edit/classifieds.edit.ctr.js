(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;
            vm.closeSidenav = closeSidenav;
            vm.saveEdit = saveEdit;
            vm.classifiedId = $state.params.id;
            vm.classified = $state.params.classified;

            $timeout(function () {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidenav() {
                vm.sidenavOpen = false;
            }

            function saveEdit() {
                if (vm.classified) {
                    classifiedsFactory.editClassified(vm.classifiedId, vm.classified).then(function (data) {
                        alert(data.data.Data);
                        if (data.data.Data == 'Success') {
                            $scope.$emit('editSaved', 'Edit Saved!');
                            vm.sidenavOpen = false;
                        }
                    });
                }
            }

        })
})();