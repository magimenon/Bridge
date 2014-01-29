var bridge = bridge || {};

bridge.router = Backbone.Router.extend({
    routes: {
        'candidate' : 'candidate' ,
        'interviewer':'interviewer',
        'schedule':'schedule',
         'analytics':'analytics',
         'home':'home'
    },
    interviewer : function(){
        bridge.employeersViewObj = new bridge.employersView();
    },
    candidate : function(){
        bridge.employeersViewObj = new bridge.employersView();
    } ,
    schedule :function(){
        bridge.scheduleViewObj = new bridge.analytics();
        bridge.scheduleViewObj.render();
    },
    analytics :function(){
        bridge.analyticsObj = new bridge.analytics();
        bridge.analyticsObj.render();
    },
    home:function() {
        new bridge.HomeView(app.homeItem);
    }
})





