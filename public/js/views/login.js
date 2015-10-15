define(['text!templates/login.html'], function( loginTemplate){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(loginTemplate),

        events: {
        },

        initialize: function(options){
            this.render(options);
        },

        render: function(options){
            this.$el.html(this.template({user: false}));
            return this;
        }
    });

    return View;
});