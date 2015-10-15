var View = Backbone.View.extend({
        el: '#search_container',
        template: _.template( $("#login").html(), {} ),

        events: {
        },

        initialize: function(options){
            this.render(options);
        },

        render: function(options){
            this.$el.html(this.template({"userId": options}));
            return this;
        }
});

var view = new View();
