var bridge = bridge || {};


bridge.matchView = Backbone.View.extend({
    template : _.template($('#matchView').html()) ,
    el :   $('#mid-section-container'),
    render : function(){
        mdlObj  = new bridge.ScheduleModel(this.model.id);
        mdlObj.create();
        this.$el.html(this.template(this.model.toJSON()));
    }
})