var bridge = bridge || {};

bridge.router = Backbone.Router.extend({
    routes: {
        'candidate': 'candidate',
        'interviewer': 'interviewer',
        'schedule': 'schedule',
        'analytics': 'analytics',
        'home': 'home',
        "search/:query": "search"
    },

    search: function (value) {
        console.log(value);
        bridge.employeersViewObj = new bridge.candidateContainerView({"search": value});

    },
    interviewer: function () {
        bridge.employeersViewObj = new bridge.candidateContainerView();
    },
    candidate: function () {
        bridge.employeersViewObj = new bridge.candidateContainerView();
    },
    schedule: function () {
       bridge.scheduleContainerViewObj = new bridge.scheduleContainerView();
        bridge.scheduleContainerViewObj.selectCandidate();
    },
    analytics: function () {
        bridge.analyticsObj = new bridge.analytics();
        bridge.analyticsObj.render();
    },
    home: function () {
        new bridge.HomeView(app.homeItem);
    }
})





