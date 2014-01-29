var bridge = bridge || {};

bridge.EmployeeModelCol = Backbone.Collection.extend({
model : bridge.EmployeeModel,
    url: '/candidate/'
})