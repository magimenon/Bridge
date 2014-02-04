var bridge = bridge || {} ;

bridge.deleteCandidate = Backbone.View.extend({
    template : _.template($('#deleteCandidate').html()),
    events :{
        "click #Delete" : "deleteCandidate" ,
        "click #Update" : "updateCandidate" ,
        "click .addSkillSet": "addSkill"
    },

    addSkill: function (event) {
        var element = $('.addSkillSet');
        element.remove();
        $('#skillSet').append(' <div class="skill">' +
            '<label for="SkillSet">SkillSet: </label><input class="SkillSet text-input" class="text-input"  placeholder= "SkillSet" type="text" />' +
            '<input class="totalYears text-input" placeholder= "Years" type="number" />' +
            '<button class="addSkillSet" class="routeButton">Add</button>  </br></div>');
    },
    updateCandidate : function(){
        var formData = {};
        var validateForm = function(id){
            formData.name = $('#name')[0].value ? $('#name')[0].value : "";
            formData.emailId = $('#emailId')[0].value ? $('#emailId')[0].value : "";
            formData.totalYears = $('#totalYears')[0].value ? $('#totalYears')[0].value : "";
            formData.SkillSet = [];
            var skillSetElement = $('#skillSet');
            var counter = 0;
            $(skillSetElement[0].children).each(function (i) {
                var key = $(this).find(".SkillSet");
                if(key.length)
                {
                key = key[0].value;
                if (key) {
                    var value = $(this).find(".totalYears");
                    value = value[0].value;
                    formData.SkillSet[counter] = {};
                    formData.SkillSet[counter++][key] = value;
                }
                }

            });
            console.log(formData.SkillSet)
            formData.result = $('#Result').value ? $('#Result').value : "";

        }
        validateForm("deleteCandidateForm");
            this.model.set({
            name:formData.name,
            emailId:formData.emailId,
            totalYears :formData.totalYears,
            SkillSet : formData.SkillSet,
            selected : formData.selected

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