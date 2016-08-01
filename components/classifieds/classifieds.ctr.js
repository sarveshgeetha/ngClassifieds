(function() {

  "use strict";


  angular
   .module("ngClassifieds")
   .controller("classifiedsCtrl" ,function ($scope , $state ,  $http , classifiedsFactory , $mdSidenav , $mdToast , $mdDialog) {
   
    var vm =this ; 


    vm.openSidebar = openSidebar;
    vm.closeSidebar = closeSidebar;
    vm.saveClassified = saveClassified;
    vm.editClassified = editClassified
    vm.saveEdit = saveEdit;
    vm.deleteClassified = deleteClassified;
    vm.showToast = showToast;

    vm.classifieds;
    vm.categories;
    vm.editing;
    vm.newClassified;

    vm.classifieds = classifiedsFactory.ref;
    vm.classifieds.$loaded().then(function(classifieds){

        vm.categories = getCategories(classifieds);
    })

    // classifiedsFactory.getClassifieds().then(function(classifieds)
    // {
    // 	vm.classifieds =classifieds.data;
    // 	vm.categories = getCategories(vm.classifieds);
    // })
     
     $scope.$on('newClassified' , function(event ,classified){
        // classified.id = vm.classifieds.length + 1;
        // vm.classifieds.push(classified);
        vm.classifieds.$add(classified);
        showToast("Classified Saved !!");
     });

     $scope.$on('editSaved' , function(event,message) {
        showToast(message);
     })

     function openSidebar()
     {
       $state.go('classifieds.new');
     }
      function closeSidebar()
     {
       $mdSidenav('left').close();
     }
     function saveClassified(classified)
     {
     	if(classified)
     		{     
     		    classified.contact=contact;	
     			vm.classifieds.push(classified);
     			vm.newClassified={};
     			closeSidebar();
     			showToast("classified Saved!!");
     		}
     }
     function editClassified(classified)
     {
      $state.go('classifieds.edit' , {id : classified.$id});
      //$state.go('classifieds.edit' , {id : classified.id , classified : classified});
     }
     function saveEdit()
     {
     	vm.editing = false;
     	vm.newClassified={};
     	closeSidebar();
     	showToast("Edit Saved!!");
     }
     function deleteClassified(event,classified)
     {
     	var confirm = $mdDialog.confirm()
     							.title('Are you sure you want to delete ' + classified.title + '?')
     							.ok('Yes')
     							.cancel('No')
     							.targetEvent(event);
     	$mdDialog.show(confirm).then(function(){
            vm.classifieds.$remove(classified);
     		// var index = vm.classifieds.indexOf(classified);
     		// vm.classifieds.splice(index,1);
     		showToast("classified Deleted!");
     	} , function()
     	{

     	});					
     	
     }
     function showToast(message) {
     	$mdToast.show(
     				$mdToast.simple()
     				.content(message)
     				.position('top, right')
     				.hideDelay('3000')
     				);
     }

     function getCategories(classifieds){

     	var categories = [];

     	angular.forEach(classifieds , function(item){
     		angular.forEach(item.categories, function(category){
    			categories.push(category);
     		});
     	});
     	return _.uniq(categories);
      }
   });
})();