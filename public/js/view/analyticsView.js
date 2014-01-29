var bridge = bridge || {} ;

bridge.analytics = Backbone.View.extend({
    template : _.template($('#analytics').html()) ,
    el :   $('#mid-section-container'),
    render : function(){
        this.$el.html(this.template());
    }
})