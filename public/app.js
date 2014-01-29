// site/js/app.js
var app = app || {};
$(function() {

    app.homeItem =  [{
        name : "Home",
        title :"Home",
        description:"" ,
        route :"home"

    },{
        name : "Candidate",
        title :"Candidate",
        description:"" ,
        route :"candidate"

    }
    ,{
        name : "Interviewer",
        title :"Interviewer",
        description:"" ,
       route :"interviewer"
    },{
        name : "Schedule Interview",
        title :"Schedule Interview",
        description:"",
       route :"schedule"
    },
        {
            name : "Analytics",
            title :"Analytics",
            description:"" ,
            route :"analytics"
        }]
    bridge.bridgeRouter = new bridge.router();
        Backbone.history.start();
    new bridge.HomeView(app.homeItem);
});