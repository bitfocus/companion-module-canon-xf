const { InstanceStatus } = require('@companion-module/base');

const request = require('request');

module.exports = {
	initConnection: function () {
		let self = this;

		self.Login();
	},

	Login: function () {
		let self = this;
	
		let url = `http://${self.config.username}:${self.config.password}@${self.config.host}/api/acnt/login`

		request.get({ url: url }, function (error, response, body) {
			try {
				let jsonBody = JSON.parse(body)
				if (jsonBody.res === 'ok') {
					//grab the cookie data
					let cookies = response.headers['set-cookie']
					try {
						let cookiesString = cookies.toString()
						let cookiesArray = cookiesString.split(';')
	
						for (let i = 0; i < cookiesArray.length; i++) {
							if (cookiesArray[i].indexOf('acid=') > -1) {
								//this is the acid we want
								let values = cookiesArray[i].split('=')
								self.acid = values[1]
							} else if (cookiesArray[i].indexOf('authlevel=') > -1) {
								//this is the auth level we need
								let value = cookiesArray[i].substring(cookiesArray[i].indexOf('authlevel=') + 10)
								self.authlevel = value
							}
						}
	
						if (self.acid !== '') {
							self.updateStatus(InstanceStatus.Ok);
							self.log('info', 'Session authenticated. ACID: ' + self.acid);
							self.GetUpdate();
						}
					} catch (error) {
						self.updateStatus(InstanceStatus.ConnectionFailure, error);
					}
				} else if (jsonBody.res === 'errsession') {
					//someone else is logged in to the browser remote
					self.updateStatus(InstanceStatus.ConnectionFailure, 'Unable to Authenticate. Retrying in 10 seconds...');
					self.log('error', 'Session not authenticated. Is someone else using the Browser Remote? Retrying in 10 seconds...');
					setTimeout(self.Login.bind(self), 10000) //retry in 10 seconds
				} else {
					//something else we didn't catch
					self.log('debug', jsonBody.res);
				}
			} catch (error) {
				self.log('error', 'Error:' + error);
			}
		})
	},

	GetUpdate: function () {
		let self = this;
	
		let cmd = `/api/cam/getcurprop?seq=${self.seq}`
	
		let url = `http://${self.config.host}${cmd}`
	
		if (self.acid !== '') {
			let cookieJarAuth = request.jar()
			let cookie1 = request.cookie('acid=' + self.acid)
			let cookie2 = request.cookie('authlevel=' + self.authlevel)
			let cookie3 = request.cookie('productId=VOAX00')
			let cookie4 = request.cookie('brlang=0')
			cookieJarAuth.setCookie(cookie1, url)
			cookieJarAuth.setCookie(cookie2, url)
			cookieJarAuth.setCookie(cookie3, url)
			cookieJarAuth.setCookie(cookie4, url)
	
			request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
				try {
					let jsonBody = JSON.parse(body)
					if (jsonBody.res === 'ok') {
						//the command ran ok
						if (jsonBody.seq) {
							self.seq = jsonBody.seq
						}
						self.DATA = { ...self.DATA, ...jsonBody};
						self.checkVariables();
						self.checkFeedbacks();
						setTimeout(self.GetUpdate.bind(self), 1000);
					} else if (jsonBody.res === 'errsession') {
						//someone else is logged in to the browser remote
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Browse Remote already in use');
						self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
						self.Logout()
					} else if (jsonBody.res === 'busy') {
						//do something because it's in the busy state
						self.log('debug', 'Unable to get status, the device is busy');
					} else {
						//something else we didn't catch
						if (self.config.verbose) {
							self.log('debug', jsonBody.res)
						}
					}
				} catch (error) {
					self.updateStatus(InstanceStatus.UnknownError, 'Error getting updates: ' + error);
					self.log('error', 'Error getting updates: ' + error);
				}
			})
		} else {
			//invalid acid
			self.updateStatus(InstanceStatus.ConnectionFailure, 'Session not authenticated.');
			self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
		}
	},
	
	Logout: function () {
		let self = this;
	
		self.acid = ''
		self.authlevel = ''
	},

	sendCommand: function(cmd) {
		let self = this;

		if (cmd !== undefined) {
			let url = `http://${self.config.host}/api/cam/${cmd}`;
	
			if (self.acid !== '') {
				let cookieJarAuth = request.jar()
				let cookie1 = request.cookie('acid=' + self.acid)
				let cookie2 = request.cookie('authlevel=' + self.authlevel)
				let cookie3 = request.cookie('productId=VOAX00')
				let cookie4 = request.cookie('brlang=0')
				cookieJarAuth.setCookie(cookie1, url)
				cookieJarAuth.setCookie(cookie2, url)
				cookieJarAuth.setCookie(cookie3, url)
				cookieJarAuth.setCookie(cookie4, url)
	
				request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
					let jsonBody = JSON.parse(body)
	
					if (jsonBody.res === 'ok') {
						//the command ran ok
					} else if (jsonBody.res === 'errsession') {
						//someone else is logged in to the browser remote
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Browse Remote already in use');
						self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
					} else {
						//something else we didn't catch
						if (self.config.verbose) {
							self.log('debug', jsonBody.res)
						}
					}
				})
			} else {
				//invalid acid
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Session not authenticated.');
				self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
			}
		}
	}
}