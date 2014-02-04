var bridge = bridge || {};

bridge.CandidateModelCol = Backbone.Collection.extend({
model : bridge.CandidateModel,
    url: '/candidate/'  ,

    initialize : function(query){
      if(query && query.search){
          this.url = this.url + query.search ;
      }
    }
})