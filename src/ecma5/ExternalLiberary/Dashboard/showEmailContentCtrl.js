'use strict';

var showEmailContentCtrl = function showEmailContentCtrl(uibModal, _content) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Dashboard/showEmailContent.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, $translate, content) {
                $scope.data = {
                    content: !_.includes([null, "", undefined, ''], content) ? content : $translate.instant('desktop.zm.create_doc_rel_modal_no_result_found') //$injector.get('$compile')(content)
                };
                $scope.func = {
                    cancel: function cancel() {
                        return $uibModalInstance.close(false);
                    }
                };
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                content: function content() {
                    return _content;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else resolve(true);
        }, function (error) {
            return resolve(true);
        });
    });
};