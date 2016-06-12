var cron = require('cron');


/* Add optional args */
module.exports.periodic_job = function (period, func){
	var cronJob = new cron.job('*/' + period + '* * * * *', func);
	cronJob.start();
	return cronJob;
}


