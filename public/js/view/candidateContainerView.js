var bridge = bridge || {};

bridge.candidateContainerView = Backbone.View.extend({
   template : _.template($('#candidateHeaderTemplate').html()),
    el :   $('#mid-section-container'),
    addCandidateView : "" ,

    
 initialize : function(modelobj){

     bridge.collection = new bridge.CandidateModelCol(modelobj);
     bridge.collection.fetch({reset :true});
     this.render();
     this.listenTo(bridge.collection ,"add" ,this.renderEmployee);
     this.listenTo(bridge.collection ,"reset" ,this.render);
     this.listenTo(bridge.collection ,"remove" ,this.render);
    // this.listenTo(bridge.collection, "change", this.render);



 }, 
    
  events :{
     "click #add-employee" : "addForm" ,
      "keypress #search" : "search"
    },


   search : function(event){
         if(event.keyCode === 13){
            // this.remove();
             bridge.bridgeRouter.navigate("search/"+event.target.value,true);
         }
   },


    validateForm : function(id){
        console.log( $( '#'+id ).children());
        var element =  $( '#'+id ).children();
        var formData = {};
        formData.name = $('name').value() ? $('name').value() : "" ;
        formData.emailId = $('emailId').value() ? $('emailId').value() : "" ;
        formData.totalYears = $('totalYears').value() ? $('totalYears').value() : "" ;
        formData.skillSet = [];
        $('.SkillSet').each(function(i,el){
            if( $( el ).val() != '' ){
                formData.skillSet[ i ] = $( el ).val();
                $( el ).val('')  ;
            }

        })


        return formData;
    },

    addCandidate : function(e){
        e.preventDefault();
        var formData =   this.validateForm("addCandidateForm");
        bridge.collection.create( formData );
        this.addCandidateView.remove();
       // this.collection.add(new app.EmployeeModel(formData));
    },

  addForm : function(){
       this.addCandidateView = new bridge.addCandidate({

       })
      this.$el.html(this.addCandidateView.render().el);
      setTimeout(function(){
          $('#addCandidateForm').addClass("scale");
      },0)

  },
    
    
render : function(){
   this.$el.html(this.template());
    bridge.collection.each(function(modelObj){
  this.renderEmployee(modelObj);
},this)
},

renderEmployee : function(modelObj){
  var employeeView = new bridge.candidateView({
  model : modelObj
  })
  $('#row-container').append(employeeView.render().el);
 }
})