var express = require('express');
var mongodb = require('mongodb');
var bodyParser=require('body-Parser');
var MongoClient = mongodb.MongoClient;

var server = express();
var ename;
var epassword;
var erole;

server.use(express.static(__dirname + '/public'));

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect('mongodb://venky:venky@ds163360.mlab.com:63360/mongo',function(err,db){
	if(err)
	{
		console.log('connection is not established');
}
	else
	{

		console.log('connection is established');
		var collection=db.collection('EmployeeTask');
	
	
		server.post('/signapi',function(req,res){
		console.log("this is your profile");
		var eid=req.body.eid
		var password=req.body.password
		ename=eid;
		epassword=password;
		collection.find({"eid":eid,"password":password}).toArray(function(err,result)
			{
			if(result)
			{
				if(!err){
					erole=result[0].role;
				}
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})		
	})//end of loginctrl api

		
	server.post('/profileapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{
		
		console.log("this is your profile");
		collection.find({"eid":ename,"password":epassword}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
			}
		
	})//end of profile api

	
	server.post('/empsearchapi',function(req,res){
				if(ename==null){
			var r={"output":"fail"};
			res.send(r);
		}else{
		var empname=req.body.empname
		collection.find({"fname":new RegExp('^'+empname)}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})	
			}
	})//end of empsearch api
	
	
	server.post('/tasklistapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{
			if(erole=='employee'){
		console.log("this is your tasklist");
		collection.find({"eid":ename}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
				
			}
			else{
		console.log("this is your tasklist");
		collection.find({"role":"employee"}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
			}
			}
		
	})//end of tasklist api

	server.post('/tasklistindapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{	
		
		console.log("this is your tasklistind");
		var eid=req.body.eid
		collection.find({"eid":eid}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
			}
		
	})//end of tasklistind api

	
	server.post('/asigntaskapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{
				if(erole!='employee')
				{
		
		console.log("this is your asigntask");
		collection.find({"role":"employee"}).toArray(function(err,result)
			{
			if(result)
			{
			var r={"output":result};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
			}
			else
			{
			var r={"output":"Sorry, you are not a lead so you cannot access this link"};
			res.send(r);
			console.log(r)
				
			}	
			
			}
				
		
	})//end of tasklist api
	
	
	server.post('/asigntaskindapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{		
		console.log("this is your asigntaskind");
		var eid=req.body.eid;
		var gettask=req.body.gettask;
		var status=req.body.status;
		var comments=req.body.comments;


		console.log(gettask+"  "+ename+"  "+eid);
		collection.update({"eid":eid},{$set:{"gettask":gettask,"asignedby":ename,"status":status,"comments":comments}},function(err,result){
			if(result)
			{
			var r={"output":"Task is assigned to "+eid};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
		
			}
		
	})//end of tasklistind api

	
		
	server.post('/commentsapi',function(req,res){
			if(ename==null){
			var r={"output":"fail"};
			res.send(r);
			}
			else
			{					
		console.log("this is your status update");
		var status=req.body.status;
		var comments=req.body.comments;
		var eeid=req.body.eid;
		console.log(comments+"  "+comments+"  "+eeid)
		collection.update({"eid":eeid},{$set:{"status":status,"comments":comments}},function(err,result){
			if(result)
			{
			var r={"output":"You are successfully updated your status"};
			res.send(r);
			}
			else
			{			
			res.send("failed")
			}
			})
			}
		
	})//end of status api

	
	
	server.post('/logoutapi',function(req,res){
		ename=null;
		epassword=null;
		erole=null;
		var r={"output":"success"}
		res.send(r);
	})//end of logout api

	
		}//end of else case
	});
	
	
	
server.listen(5005,function(){
	console.log('connection is at port:5005');
});