var bridge = bridge || {};

bridge.HomeView = Backbone.View.extend({
    className :"startItemContainer",
    el : $('aside'),


    initialize : function(dataArray){
        bridge.homeCollectionobj = new bridge.homeCollection(dataArray);
        bridge.scheduleInterviewObj = new bridge.scheduleInterview();
        bridge.scheduleInterviewObj.render();
        this.render();
                setTimeout(function(){
          document.getElementsByTagName("aside")[0].style.left = "0px";
        },1000)
    },

    render : function(){
        this.$el.html("");
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
      'click .routes' : "doAction"
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