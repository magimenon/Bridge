var bridge = bridge || {};

bridge.ScheduleCollection = Backbone.Collection.extend({
    model : bridge.CandidateModel,
    url: '/Schedule/'  ,

    initialize : function(query){
        if(query && query.search){
            this.url = this.url + query.search ;
        }
    }
})