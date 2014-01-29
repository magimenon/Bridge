var bridge = bridge || {};

bridge.scheduleInterview = Backbone.View.extend({

    template : _.template($('#scheduleTemplate').html()),
    el :   $('#mid-section-container'),
    events:{
     "click #schedule_interview" : "scheduleInterview"
    },

    scheduleInterview : function() {
    	bridge.bridgeRouter.navigate("schedule",true);
    },

    render : function(){
        this.$el.html(this.template()) ;
    }

})