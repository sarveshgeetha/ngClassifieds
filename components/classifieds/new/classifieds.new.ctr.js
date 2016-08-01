(function(){

	"use strict";

	angular
		.module("ngClassifieds")
		.controller("newClassifiedsCtrl" , function($scope , $state , $mdSidenav , $timeout , $mdDialog , classifiedsFactory){

			var vm = this;
 			vm.closeSidebar = closeSidebar;
 			vm.saveClassified = saveClassified;
			$timeout(function(){
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen' , function(sidenav){
				if(sidenav === false)
				{
					$mdSidenav('left')
						.close()
							.then(function(){
								$state.go('classifieds');
							});
				}
			});
			
			function closeSidebar()
			{
				vm.sidenavOpen=false;
			}

			function saveClassified(classified) {
				if(classified)
				{
					  classified.contact = {
								     	name: "Sarveshwar Geetha" ,
								     	phone: "(91) 7401278865",
								     	email: "sarveshgeetha@hotmail.com" 
								     };
					$scope.$emit('newClassified' , classified);
					closeSidebar();
				}
			}

		});



})();