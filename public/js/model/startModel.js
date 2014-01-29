var bridge = bridge || {};
bridge.homeModel = Backbone.Model.extend({

    defaults :{
        _id:null,
        name: "nothing",
        url :"nothing",
        title:"nothing",
        description:"nothing"
    }

});


bridge.homeCollection = Backbone.Collection.extend({
    model: bridge.homeModel
})

