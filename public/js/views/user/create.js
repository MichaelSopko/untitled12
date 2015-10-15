define(['text!templates/create.html'], function( createTemplate){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(createTemplate),

        events: {
            'click #create-button': 'create'
        },

        initialize: function(options){
            this.render(options);
        },

        create: function() {
            var form = $('.SingUp-form');

            $.ajax({
                url: "/registration",
                method: "POST",
                data: form.serialize(),
                complete: function () {
                    console.log('good');
                },
                statusCode: {
                    200: function(){
                        form.html  ("Welcome").addClass('alert-success');
                        window.location.href = "/";
                        console.log(req.session.user);
                    },
                    404: function(jqXHR){
                        var error = JSON.parse(jqXHR.responseText);
                        $('.error',form).html(error.message);
                    }
                }
            });
            return false;
        },

        render: function(options){
            this.$el.html(this.template({user: false}));
            return this;
        }
    });

    return View;
});