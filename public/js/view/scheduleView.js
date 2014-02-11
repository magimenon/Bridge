
var bridge = bridge || {};

bridge.scheduleView = Backbone.View.extend({
    template: _.template($('#SelectcandidateTemplate').html()),
    events : {
        "click .check" : "checkSelected"

    },


    checkSelected : function(events){
        console.log(this.model);
       var matchViewObj = new  bridge.matchView({
           model : this.model
       });

        matchViewObj.render();

    },




    render: function () {
        var object = $.extend({}, this.model.toJSON(), {"selector":"true"});
        this.$el.html(this.template(object));
        return this;
    }

})