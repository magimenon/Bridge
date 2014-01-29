var bridge = bridge || {} ;

bridge.deleteEmployee = Backbone.View.extend({
    template : _.template($('#deleteCandidate').html()),
    events :{
        "click #Delete" : "deleteCandidate" ,
        "click #Update" : "updateCandidate" ,
        "click .addRound" : "addLevel"
    },

    addLevel : function(){
      this.comboBoxViewobj = new bridge.comboBoxView();
      $('#interViewRound').append(this.comboBoxViewobj.render().el)
    },
    updateCandidate : function(){
        var formData = {};
        var validateForm = function(id){

            $( '#'+id ).children( 'input' ).each( function( i, el ) {
                if( $( el ).val() != '' ){
                    formData[ el.id ] = $( el ).val();
                    $( el ).val('')  ;
                }
            });

        }
        validateForm("deleteCandidateForm");
            this.model.set({
            name:formData.name,
            emailId:formData.emailId,
            totalYears :formData.totalYears

        });

        this.model.save();
        //bridge.collection.set(this.model,[{add: true}, {remove: true},{reset:true}]);
        this.remove();
    },
    deleteCandidate:function () {

        this.model.destroy();
        bridge.collection.remove(this.model);
        this.remove();

    },


    render : function(){
        if(this.model){
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    }
})