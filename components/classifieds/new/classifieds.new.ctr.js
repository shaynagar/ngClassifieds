(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;
            vm.closeSidenav = closeSidenav;
            vm.saveClassified = saveClassified;

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

            function closeSidenav(){
                vm.sidenavOpen = false;
             }

            function saveClassified(classified) {
                if (classified) {
                    classifiedsFactory.addClassified(classified).then(function (data) {
                        alert(data.data.Data);
                        if (data.data.Data == 'Success') {
                            $scope.$emit('newClassified', classified);
                            vm.sidenavOpen = false;
                        }
                    });
                }
            }

        })
})();