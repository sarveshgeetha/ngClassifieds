(function(){

"use strict";

	angular
	   .module("ngClassifieds")
	   .factory("classifiedsFactory" , function($http , $firebaseArray ){
         
	    var config = {
					    apiKey: "AIzaSyCFrVGP4PQB5vr80JWMGQdS38gr_Xs-u8Q",
					    authDomain: "ngclassifieds-61517.firebaseapp.com",
					    databaseURL: "https://ngclassifieds-61517.firebaseio.com",
					    storageBucket: "ngclassifieds-61517.appspot.com",
					  };

		firebase.initializeApp(config);

		var ref = firebase.database().ref();
 		return {
 			ref: $firebaseArray(ref)
 		}
	   });


})();