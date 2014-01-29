var bridge = bridge || {};

bridge.HomeView = Backbone.View.extend({
    className :"startItemContainer",
    el : $('aside'),


    initialize : function(dataArray){
            bridge.bridgeRouter = new bridge.router();
            Backbone.history.start();
      bridge.homeCollectionobj = new bridge.homeCollection(dataArray);
        bridge.scheduleInterviewObj = new bridge.scheduleInterview();
        bridge.scheduleInterviewObj.render();
        this.render();
    },

    render : function(){
        bridge.homeCollectionobj.each(function(modelObj){
            this.renderEmployee(modelObj);
        },this)
    },

    renderEmployee : function(modelObj){

        var viewItemObj = new bridge.homeItemView({
            model : modelObj
        })
        this.$el.append(viewItemObj.render().el);
        return this;
    }

})

bridge.homeItemView = Backbone.View.extend({
    template : _.template($('#homeTemplate').html()) ,

     events : {
      'click .routeButton' : "doAction"
     },

    doAction : function(obj){
        console.log(this.model);
        bridge.bridgeRouter.navigate(this.model.get("route"),true);
    },
    render : function(){
        this.$el.html(this.template(this.model.toJSON()))
        return this;
    }
})