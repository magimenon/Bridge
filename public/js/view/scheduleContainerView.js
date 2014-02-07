var bridge = bridge || {} ;

bridge.scheduleContainerView = Backbone.View.extend({
    template: _.template($('#selectCandidateCont').html()),
    el :   $('#mid-section-container'),
    initialize : function(){

    },

    selectCandidate : function(){
        bridge.schedulecanCollection = new bridge.CandidateModelCol();
        this.listenTo(bridge.schedulecanCollection ,"reset" ,this.render);
        bridge.schedulecanCollection.fetch({reset :true});
        this.render();
    },

    selectInterviewer : function(){

    },

    scheduleInterview : function(){

    } ,

    render : function(){
        this.$el.html(this.template());
        bridge.schedulecanCollection.each(function(modelObj){
            this.renderItem(modelObj);
        },this)
    }  ,

    renderItem : function(modelObj){
        var scheduleViewObj = new bridge.scheduleView({
            model : modelObj
        })
        $('#selectCanCont').append(scheduleViewObj.render().el);
    }

})