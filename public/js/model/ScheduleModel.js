var bridge = bridge || {};
bridge.ScheduleModel = Backbone.Model.extend({
    idAttribute: '_id',
    url: '/schedule/',
    defaults :{
        candidate_id :"nothing"
    },

    initialize : function(obj){
        this.candidate_id = obj;
    }
});