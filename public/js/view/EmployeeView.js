var bridge = bridge || {} ;

bridge.employeeView = Backbone.View.extend({
    template : _.template($('#candidateTemplate').html()),
    events :{
        'click .keyClick' : "deleteEmployee"
    },
//    initialize : function(){
//        this.listenTo(bridge.collection ,"remove" ,this.removeEmployee) ;
//    },
//    removeEmployee : function(event){
//        this.remove();
//        return;
//    },

    deleteEmployee : function(e){
        this.deleteEmployeeView = new bridge.deleteEmployee({
            model:this.model
        })
        $('#mid-section-container').html(this.deleteEmployeeView.render().el);

        setTimeout(function(){
            $('#deleteCandidateForm').addClass("scale");
        },0)

    },

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

})