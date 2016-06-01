
var app = angular.module('myApp', ['ngAnimate']);

app.controller('indexCtrl', function ($scope, $http, $filter) {
    
    $scope.ngtype = 'temptop';
    $scope.ngdate = $filter('date')(new Date(), 'yyyy/MM/dd')
    
    $('#datep').datepicker().on('change', function () {
        $scope.$apply(function () {
            $scope.ngdate = $('#datep').val()
        });
    });
    
    $scope.submit = function () {
        //console.log($scope.ngtype);
        //console.log($filter('date')(new Date($scope.ngdate),'yyyyMMdd'));
        
        $scope.sMessage = '';
        $scope.objJson = {};
        $.blockUI({
            message: '<img src="./view/img/page-loader.gif" />'
        });
        
        //$http.get('api/20160525_temptop.json', {cache: false})
        $http({
            method: 'GET',
            url: './api/log',
            cache: false,
            params: {
                type: $scope.ngtype,
                date: $filter('date')(new Date($scope.ngdate), 'yyyyMMdd')
            }
        })
		.success(function (data, status, headers, config) {
            
            //console.log(data);
            
            if (data.state == 1) {
                $scope.objJson = data;
            } else {
                $scope.sMessage = '資料有誤!!';
            }
            
            setTimeout($.unblockUI, 1000);
			
        })
		.error(function (data, status, headers, config) {
            $scope.sMessage = '查詢失敗!!';
            
            setTimeout($.unblockUI, 1000);
			
        });
    }
	
});
