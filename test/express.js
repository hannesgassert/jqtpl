var o = {
        root: __dirname + '/fixtures',
        port: 8888    
    };
    
function request(path, callback) {
    var http = require('http');
    var client = http.createClient(o.port);
    var request = client.request('GET', path, {'host': 'http://localhost'});
    
    request.on('response', function (response) {
        response.setEncoding('utf8');
	    response.on('data', callback);
    });
        
    request.end();
}

var locals;

QUnit.module('express', {
    setup: function() {
        var express = require('express');
        
        var app = this.app = express.createServer();
        
        app.set('view engine', 'html');
        app.set('views', o.root + '/views');
        app.set('view options', {layout: false});        
        // qunit copies jqtpl.express exports to global
        app.register('.html', global);
        app.get('/:view', function(req, res){
            res.render(req.params.view, locals);
        });
        app.listen(o.port);
    },
    teardown: function() {
        this.app.close();
        locals = undefined;
    }
});

test("locals", 1, function() {
   stop(); 
   locals = {a:1};
   request('/view', function(data) {
       equal(data, '<div>1</div>', 'template rendered correctly');
       start();
   });
});

test("scope option", function() {
    var fn = compile( "<div>${this.test}</div>", {scope: {test: 123}} );
    same(fn({a:1}), '<div>123</div>', "scope is correct");                
});

test("debug option", function() {
    var printed,
        util = require( "util" ),
        debug = util.debug;
    
    // mock print method
    util.debug = function( str ) {
        printed = true;
    };
    
    compile( 'test', {debug: true} )();
    
    // restore orig. print function
    util.debug = debug;
    
    ok( printed, "debug option works" );
});

test("partials using `partial`", 1, function() {
    stop();
    locals = {
        test: {
            a: 1
        }
    };
    request('/partialtest', function(data) {
        equal(data, '<div>1</div>', 'data is an object');
        start();
    });
});

test("partials using `partial`", 1, function() {
    stop();
    locals = {
        test: [
            {a: 1},
            {a: 2},
            {a: 3}
        ]    
    };
    request('/partialtest', function(data) {
        equal(data, '<div>1</div><div>2</div><div>3</div>', 'data is an array');
        start();
    });
});


