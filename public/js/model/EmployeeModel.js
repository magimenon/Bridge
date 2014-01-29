var bridge = bridge || {};
bridge.EmployeeModel = Backbone.Model.extend({
    idAttribute: '_id',
//    url: '/candidate',
    defaults :{
        name: "nothing",
        emailId :"nothing",
        SkillSet:[] ,
        rounds : "nothing",
        result :"nothing" ,
        totalYears:"nothing",
        level:[]
    }
});