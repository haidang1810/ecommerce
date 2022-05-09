const Notification = require('../models/NotificationsModel');
class NotificationsController {
    getByUser(req,res){
        const user = req.params.user;
		Notification.find({user},(err, notification) => {
			if(err) return res.json({
					status: 0,
					msg: err
				});
			res.json({
				status: 1,
				msg: 'success !!!',
				data: notification
			});			
		});
    }
}
module.exports = new NotificationsController();
