/**
 * Created by Michael on 10.10.2015.
 */
define(['views/user', 'collections/users', 'views/user/create','views/login'], function(View, Collection, Create, Login){

    var Router = Backbone.Router.extend({
        routes: {
            "users": "user",
            "login":"login",
            "registration":"registration",
            "content": "post",
            "*any": "any"
        },
        "login": function(){
             new Login();
        },
        "registration": function(){
            new Create();
        },
        user: function(){
            console.log("123123");

            var collection = new Collection();
            var renderView = function(){
                var view = new View({
                    collection: collection
                });
            };
            collection.fetch({reset:true});
            collection.bind('reset', renderView);
        },

        posts: function(){
            alert('Posts');
        },

        any: function(){
            alert('404');
        }
    });

    return Router;
});