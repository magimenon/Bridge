
var bridge = bridge || {};

bridge.scheduleView = Backbone.View.extend({
    template: _.template($('#SelectcandidateTemplate').html()),
    render: function () {
        var object = $.extend({}, this.model.toJSON(), {"selector":"true"});
        this.$el.html(this.template(object));
        return this;
    }

})