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
    new bridge.HomeView(app.homeItem);
});