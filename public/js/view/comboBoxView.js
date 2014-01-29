var bridge = bridge || {} ;

bridge.comboBoxView = Backbone.View.extend({
    template : _.template($('#comboBoxtem').html()),
    render : function(){
        this.$el.html(this.template());
        return this;
    }


})