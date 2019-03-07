"use strict";

var notificationSql = {
	getAllNotification: "SELECT * FROM notification",
	getNotification: "SELECT * from notification where userId = ?",
	insertNotification: "INSERT INTO notification (userId, childId, flag) VALUES ?",
	updateNotification: "UPDATE notification SET flag = 0 WHERE userId = ? AND childId = ?",
	getOne: "SELECT count(*) as count FROM notification where  userId = ? AND childId = ?"
};

module.exports = notificationSql;