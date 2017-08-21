var application =angular.module("taskManager", ['ngRoute']);
application.config(function($routeProvider) {
	
	$routeProvider
		.when('/signApi',{
			templateUrl:'signin.html',
			controller:'signCtrl'
		})
		.when('/leadApi',{
			templateUrl:'lead.html',
			controller:'leadCtrl'
			
		})
		.when('/employeeApi',{
			templateUrl:'employee.html',
			controller:'employeeCtrl'

		})		
		.otherwise({
			redirectTo:'/signApi'
		});
		
});//service provider end

var emprole=null;
var statusComment=null;
var ngtaskind=null;
application.controller('signCtrl',function($scope,$http,$location){
		
	
	$scope.SignIn=function()
	{
		var eid=$scope.eid
	   var password=$scope.password
	   usereid=eid;
	   userpassword=password;
	   var data={
		   "eid":eid,
		   "password":password
	   }
		
		$http.post('http://localhost:5005/signapi',data).then(function(signin){
			
			if(signin.data.output.length>0)
			{	
				emprole=signin.data.output[0].role;
				if(signin.data.output[0].role=='employee')
				{
				$scope.res=signin.data.output
				$location.path('/employeeApi');
				}
				else
				{
					$location.path('/employeeApi');
				}
				
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}
})//end of loginCtrl api


application.controller('employeeCtrl',function($scope,$http,$location){

		$scope.ngsearch=false;
		$scope.ngasigntask=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
		if(emprole=='employee'){

		$scope.ngasignbutton=false;
			
		}
		else{
		$scope.ngasignbutton=true;
			
		}

		$scope.Search=function(){
			
		$scope.ngsearch=true;
		$scope.ngasigntask=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;

		}
		
		$scope.StatusUp=function(){
			
			$scope.ngtaskind=true;
		}

	$scope.Profile=function()
	{
		
		
		
	
		$scope.ngsearch=false;
		$scope.ngasigntask=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=true;
		$scope.ngempsearch=false;
		
		$http.post('http://localhost:5005/profileapi').then(function(profile){
			
			if(profile.data.output.length>0)
			{	
				if(profile.data.output=='fail'){
				alert("you are not logged in,please login")
				$location.path('/signApi');
				}
				else
				{
				$scope.profile=profile.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of profile
	
	$scope.EmpSearch=function()
	{
		
		$scope.ngsearch=true;
		$scope.ngasigntask=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=true;
		
		
		
		var empname=$scope.empname
	   var data={
		   "empname":empname
	   }
		
	$http.post('http://localhost:5005/empsearchapi',data).then(function(empsearch){
			
			if(empsearch.data.output.length>0)
			{	
				if(empsearch.data.output=='fail'){
					alert("you are not logged in,please login")
					$location.path('/signApi');
				}
				else
				{
				$scope.empsearch=empsearch.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of empsearch
	
	
	$scope.TaskList=function()
	{		
	
		$scope.ngsearch=false;
		$scope.ngasigntask=false;
		$scope.ngtasklist=true;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
	
	
	
	
	$http.post('http://localhost:5005/tasklistapi').then(function(tasklist){
			
			if(tasklist.data.output.length>0)
			{	
				if(tasklist.data.output=='fail'){
					alert("you are not logged in,please login")
					$location.path('/signApi');
				}
				else
				{
				$scope.tasklist=tasklist.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of tasklist
	
	
	$scope.TaskListInd=function()
	{
		
		$scope.ngsearch=false;
		$scope.ngasigntask=false;
		$scope.ngtasklist=true;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
		
		
		
		var eid=$scope.empid
 	   var data={
		   "eid":eid
		   
	   }
		
	$http.post('http://localhost:5005/tasklistindapi',data).then(function(tasklistind){
			
			if(tasklistind.data.output.length>0)
			{	
				if(tasklistind.data.output=='fail'){
					$location.path('/signApi');
				}
				else
				{
				statusComment=tasklistind.data.output[0].eid;
				$scope.tasklistind=tasklistind.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of tasklistind
	
	
	
	$scope.AsignTask=function()
	{		
	
		$scope.ngsearch=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
	
	
	
	$http.post('http://localhost:5005/asigntaskapi').then(function(asigntask){
			
			if(asigntask.data.output.length>0)
			{	
				if(asigntask.data.output=='fail'){
					alert("you are not logged in,please login")
					$location.path('/signApi');
				}
				else
				{
					if(asigntask.data.output=='Sorry, you are not a lead so you cannot access this link'){
					$scope.ngasigntask=false;

					}
					else{
					$scope.ngasigntask=true;

					}
					
				$scope.asigntask=asigntask.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of asigntask

	$scope.AsignTaskInd=function()
	{
		
		$scope.ngsearch=false;
		$scope.ngasigntask=true;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
				
		var eid=$scope.eid
		var gettask=$scope.asigningtask
		var status=$scope.status
		var comments=$scope.comments
		var data={
		   "eid":eid,
		   "gettask":gettask,
		   "status":status,
		   "comments":comments
	   }

		
	$http.post('http://localhost:5005/asigntaskindapi',data).then(function(asigntaskind){
			
			if(asigntaskind.data.output.length>0)
			{	
				if(asigntaskind.data.output=='fail'){
					alert("you are not logged in,please login")
					$location.path('/signApi');
				}
				else
				{
				alert(JSON.stringify(asigntaskind.data.output))
				$scope.asigntaskind=asigntaskind.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of asignindtask
	

	
	
	$scope.Comments=function(a)
	{
		$scope.ngsearch=false;
		$scope.ngasigntask=false;
		$scope.ngtasklist=false;
		$scope.ngprofile=false;
		$scope.ngempsearch=false;
		
		
		var status=$scope.statuss
		var comments=$scope.commentss
		var data={
		   "status":status,
		   "comments":comments,
		   "eid":statusComment
	   }

		
	$http.post('http://localhost:5005/commentsapi',data).then(function(sstatus){
			
			if(sstatus.data.output.length>0)
			{	
				if(sstatus.data.output=='fail'){
					alert("you are not logged in,please login")
					$location.path('/signApi');
				}
				else
				{
				alert(JSON.stringify(sstatus.data.output))
				$scope.sstatus=sstatus.data.output
				}
				}
			else{
				alert("Failed")
				}		
		
		})
		
	}//end of status api
	

	$scope.LogOut=function()
	{
	$http.post('http://localhost:5005/logoutapi').then(function(logout){
			
			if(logout.data.output.length>0)
			{	
				if(logout.data.output=='success')
				{
				alert('you are successfully logged out');
				$location.path('/signApi');
				}
				else
				{
				alert('sorry, not loggedout');
				}
				
				}
			else{
				alert("Failed")
				}		
		})
		
	}//end of logout

	
	
	
})//end of employeeCtrl



