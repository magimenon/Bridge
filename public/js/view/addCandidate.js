var bridge = bridge || {};

bridge.addCandidate = Backbone.View.extend({
    template: _.template($('#addCandidate').html()),
    events: {
        "click #Delete": "updateEmployee",
        "click  #cancel": "removeForm",
        "click #add": "addCandidate",
        "click .addSkillSet": "addSkill",
        "click .removeSkillSet": "removeSkill"
    },

    removeSkill: function (event) {
        console.log(event);
    },
    addSkill: function (event) {
        var element = $('.addSkillSet');
        element.remove();
        $('.skillSetCollection').append(' <div class="skill">' +
            '<label for="SkillSet">SkillSet: </label><input class="SkillSet text-input" class="text-input"  placeholder= "SkillSet" type="text" />' +
            '<input class="years text-input" placeholder= "Years" type="number" />' +
            '<button class="addSkillSet" class="routeButton">Add</button>  </br></div>');
    },

    validateForm: function (id) {
        var formData = {};
        var element = $('#' + id).children();
        formData.name = $('#name')[0].value ? $('#name')[0].value : "";
        formData.emailId = $('#emailId')[0].value ? $('#emailId')[0].value : "";
        formData.totalYears = $('#totalYears')[0].value ? $('#totalYears')[0].value : "";
        formData.SkillSet = [];
        var skillSetElement = $('.skillSetCollection');
        var counter = 0;
        $(skillSetElement[0].children).each(function (i) {
            var key = $(this).find(".SkillSet");
            key = key[0].value;
            if (key) {
                var value = $(this).find(".years");
                value = value[0].value;
                formData.SkillSet[counter] = {};
                formData.SkillSet[counter++][key] = value;
            }

        });
        console.log(formData.SkillSet)
        formData.result = $('#Result').value ? $('#Result').value : "";
        return formData;
    },
    addCandidate: function (e) {
        e.preventDefault();
        var formData = this.validateForm("addCandidateForm");
        bridge.collection.create(formData);
        this.remove();
        // this.collection.add(new app.EmployeeModel(formData));
    },
    removeForm: function (e) {
        this.remove();
         new bridge.candidateContainerView();
    },
    updateEmployee: function (e) {
        e.preventDefault();

        this.model.destroy();
// Delete view
        // this.remove();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
})