var mailer = require('nodemailer');
var Tools = require('../utils/tools.js');
var Web3 = require('web3');
var http = require('http');
var fs = require('fs');
/* Connect to local node */
if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase;
}



var mo = web3.eth.accounts[0];
var mom = web3.eth.accounts[1];
var dad = web3.eth.accounts[2];


Pinger = Tools.contracts.Pinger;
Death = Tools.contracts.Death;
UAR_abi = [ { constant: true,
    inputs: [],
    name: 'timeout',
    outputs: [ [Object] ],
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'owner',
    outputs: [ [Object] ],
    type: 'function' },
  { constant: false,
    inputs: [ [Object] ],
    name: 'setTimeReference',
    outputs: [],
    type: 'function' },
  { constant: false,
    inputs: [ [Object] ],
    name: 'changeOwner',
    outputs: [],
    type: 'function' },
  { constant: false,
    inputs: [],
    name: 'recover',
    outputs: [],
    type: 'function' },
  { inputs: [ [Object], [Object], [Object] ],
    type: 'constructor' },
  { anonymous: false,
    inputs: [ [Object] ],
    name: 'Recovery',
    type: 'event' },
  { anonymous: false,
    inputs: [],
    name: 'ownerChanged',
    type: 'event' } ];

UAR_contract = web3.eth.contract(UAR_abi);
UAR_addr = Death.UAR();
UAR = UAR_contract.at(UAR_addr);
t = 500;

sid = setInterval( ()=> {
	p = Pinger.last_ping();
	console.log(p + t); 
	console.log(Date.now());
	console.log("--------------------------")
	if (p + t < Date.now()){
		UAR.recover();
		emailDeath();
	} else  {
		emailReminder();
	}
}, t);


function emailReminder () {

	// Use Smtp Protocol to send Email
	    var smtpTransport = mailer.createTransport("SMTP",
	    {
	        service: "Gmail",
	        auth: {
	            user: "digideathchain@gmail.com",
	            pass: "lolhahalol"
	        }
	    });

	    var mail = {
	        from: "DEATH <digideathchain@gmail.com>",
	        to: "akidwaimohammad@gmail.com",
	        subject: "YOU ARE DYING",
	        text: "https://localhost:8080",
	        html: "<b>Srsly wtf ping </b>"
	    }

	    smtpTransport.sendMail(mail, function(error, response){
	        if(error){
	            console.log(error);
	        }else{
	            console.log("Message sent: " + response.message);
	        }

	        smtpTransport.close();
	    });
}

function emailDeath () {

	// Use Smtp Protocol to send Email
	    var smtpTransport = mailer.createTransport("SMTP",
	    {
	        service: "Gmail",
	        auth: {
	            user: "digideathchain@gmail.com",
	            pass: "lolhahalol"
	        }
	    });

	    var mail = {
	        from: "DEATH <digideathchain@gmail.com>",
	        to: "akidwaimohammad@gmail.com",
	        subject: "YOU DIED",
	        text: "https://localhost:8080",
	        html: "<b>sry </b>"
	    }

	    smtpTransport.sendMail(mail, function(error, response){
	        if(error){
	            console.log(error);
	        }else{
	            console.log("Message sent: " + response.message);
	        }

	        smtpTransport.close();
	    });

}
