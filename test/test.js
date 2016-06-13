var expect = require('chai').expect;
var tools = require('../tools.js');

var period = 100;
var num_periods = 10;
var mining_time = 6000;
var error = 30000;
describe("this one will work", function(){  
    var ticker = tools.deploy('ticker');
    before( function(done) {
        setTimeout(
        	function(){            
            	setTimeout( clearInterval, 
            				period*num_periods + 1000, 
            				setInterval(ticker.tick, period));
        }, mining_time);
        setTimeout(done, period*num_periods + error);
    });
    it("should pass", function(){
        expect(parseInt(ticker.val())).equals(num_periods-1);
    });
});