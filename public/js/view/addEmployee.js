var bridge = bridge || {} ;

bridge.addEmployee = Backbone.View.extend({
    template : _.template($('#addCandidate').html()),
    events :{
        "click #Delete" : "updateEmployee",
        "click  #cancel" : "removeForm" ,
        "click #add"  : "addCandidate"
    },
    validateForm : function(id){
        var formData = {};
        console.log( $( '#'+id ).children());
        var element =  $( '#'+id ).children();
        formData.name = $('#name')[0].value ? $('#name')[0].value : "" ;
        formData.emailId = $('#emailId')[0].value ? $('#emailId')[0].value : "" ;
        formData.totalYears = $('#totalYears')[0].value ? $('#totalYears')[0].value : "" ;
        formData.SkillSet = [];
        var key = $('.SkillSet')[0].value ?$('.SkillSet')[0].value :0;
         var value = $('.years')[0].value?$('.years')[0].value:0;
        formData.SkillSet[0] = {};
        formData.SkillSet[0][key]=value;
        formData.selected = $('#Result').value?$('#Result').value :"";
        return formData;
    },
    addCandidate : function(e){
        e.preventDefault();
        var formData =   this.validateForm("addCandidateForm");
        bridge.collection.create( formData );
        this.remove();
        // this.collection.add(new app.EmployeeModel(formData));
    },
    removeForm : function(e){
         this.remove();
        bridge.employeersViewObj = new bridge.employersView();
    } ,
    updateEmployee : function(e){
        e.preventDefault();

        this.model.destroy();
// Delete view
       // this.remove();
    },

    render : function(){
        this.$el.html(this.template());
        return this;
    }
})