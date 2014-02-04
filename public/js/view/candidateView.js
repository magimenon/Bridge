var bridge = bridge || {};

bridge.candidateView = Backbone.View.extend({
    template: _.template($('#candidateTemplate').html()),
    events: {
        'click .keyClick': "deleteEmployee"
    },


    deleteEmployee: function (e) {
        this.deleteCandidateView = new bridge.deleteCandidate({
            model: this.model
        })
        $('#mid-section-container').html(this.deleteCandidateView.render().el);

        setTimeout(function () {
            $('#deleteCandidateForm').addClass("scale");
        }, 0)

    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

})