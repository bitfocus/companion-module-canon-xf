const { InstanceStatus } = require('@companion-module/base');

const request = require('request');

module.exports = {
	initConnection: function () {
		let self = this;

		//check some things before we start
		if (self.config.host !== '') {
			//check the model
			if (self.config.model == 'XF405' || self.config.model == 'XF705') {
				self.config.initiateLogin = true;
				self.config.useCredentials = true;	
			}
			else if (self.config.model == 'C100') { //needs to login, but does not require a login
				self.config.initiateLogin = true;
				self.config.useCredentials = false;

				self.DATA = {
					mode: '',
					rec: '',
					com: '',
					batt: '',
					tc: '',
					cbtn: '',
					camid: '',
					Ocf: {},
					Owbm: {},
					Owbv: {},
					Oav: {},
					Ossm: {},
					Ossv: {},
					Ogcm: {},
					Ogcv: {},
					Oam: {},
					nd: '',
					fframe: '',
					pushai: '',
					aes: '',
					aesbtn: '',
					faceficon: ''
				}
			}

			if ((self.config.initiateLogin == true) || (self.config.model == 'XF405' || self.config.model == 'XF705')) {
				self.Login();
			}
		}
	},

	Login: function () {
		let self = this;

		let url = '';

		if (self.config.verbose) {
			self.log('debug', 'Attempting to login and authenticate session...');
		}

		if (self.config.useCredentials == true) {
			url = `http://${self.config.username}:${self.config.password}@${self.config.host}/api/acnt/login`
		}
		else {
			url = `http://${self.config.host}/api/acnt/login` //don't pass credentials but still request the cookie
		}
		
		if (url !== '') {
			request.get({ url: url }, function (error, response, body) {
				try {
					if (body) {
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
									self.log('debug', 'Session authenticated. ACID: ' + self.acid);
									if (self.config.model == 'XF405' || self.config.model == 'XF705') {
										self.GetUpdate();
									}
									else if (self.config.model == 'C100') {
										self.INTERVAL = setInterval(self.getC100Values.bind(self), 1000);
										self.PROPS_INTERVAL = setInterval(self.getC100Properties.bind(self), 2000);
									}
								}
							} catch (error) {
								self.updateStatus(InstanceStatus.ConnectionFailure, error);
							}
						} else if (jsonBody.res === 'errsession') {
							//someone else is logged in to the browser remote
							self.updateStatus(InstanceStatus.ConnectionFailure, 'Unable to Authenticate. Retrying in 10 seconds...');
							self.log('error', 'Session not authenticated. Is someone else using the Browser Remote? Retrying in 10 seconds...');
							setTimeout(self.initConnection.bind(self), 10000) //retry in 10 seconds
						} else {
							//something else we didn't catch
							//self.log('debug', jsonBody.res);
						}
					}
					else {
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Unable to Authenticate. Is this the right IP address?');
						self.log('error', 'Session not authenticated. Is this the right IP address?');
					}					
				} catch (error) {
					self.log('error', 'Error:' + error);
				}
			})
		}
	},

	GetUpdate: function () {
		let self = this;
	
		let cmd = `/api/cam/getcurprop?seq=${self.seq}`
	
		let url = `http://${self.config.host}${cmd}`
	
		if (self.acid !== '') {
			let cookieJarAuth = request.jar()
			let cookie1 = request.cookie('acid=' + self.acid)
			let cookie2 = request.cookie('authlevel=' + self.authlevel)
			let cookie3 = request.cookie('productId=' + self.productId)
			let cookie4 = request.cookie('brlang=' + self.brlang)
			cookieJarAuth.setCookie(cookie1, url)
			cookieJarAuth.setCookie(cookie2, url)
			cookieJarAuth.setCookie(cookie3, url)
			cookieJarAuth.setCookie(cookie4, url)
	
			request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
				try {
					if (body) {
						let jsonBody = JSON.parse(body)
						if (jsonBody.res === 'ok') {
							//the command ran ok
							if (jsonBody.seq) {
								self.seq = jsonBody.seq
							}
							self.DATA = { ...self.DATA, ...jsonBody};
							self.checkVariables();
							self.checkFeedbacks();
							self.INTERVAL = setTimeout(self.GetUpdate.bind(self), 1000);
						} else if (jsonBody.res === 'errsession') {
							//someone else is logged in to the browser remote
							self.updateStatus(InstanceStatus.ConnectionFailure, 'Browser Remote already in use');
							self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
							self.Logout()
						} else if (jsonBody.res === 'busy') {
							//do something because it's in the busy state
							self.log('debug', 'Unable to get status, the device is busy');
						} else {
							//something else we didn't catch
							if (self.config.verbose) {
								//self.log('debug', jsonBody.res)
							}
						}
					}
					else {
						let error = 'Body is empty/undefined.';
						self.log('error', 'Error getting updates: ' + error);
					}
				} catch (error) {
					self.updateStatus(InstanceStatus.UnknownError, 'Error getting updates: ' + error);
					self.log('error', 'Error getting updates: ' + error);
				}
			})
		} else {
			//invalid acid
			self.updateStatus(InstanceStatus.ConnectionFailure, 'Session not authenticated.');
			self.log('error', 'Session not authenticated. Is someone else using the Browser Remote? Did you enter the correct password?');
		}
	},

	getC100Properties: function () {
		let self = this;
		
		if (self.acid !== '') {
			self.getC100Values();

			//get the current properties from the array
			let props = [
				'wbm', //white balance mode
				'wbv', //white balance values
				'av', //iris values
				'gcm', //gain mode - gain or iso
				'gcv', //gain values based on gain mode
				'ssm', //shutter speed modes
				'ssv', //shutter speed values based on shutter speed mode
			]

			for (let prop of props) {
				self.getC100Prop(prop);
			}
		} else {
			//invalid acid
			self.updateStatus(InstanceStatus.ConnectionFailure, 'Session not authenticated.');
			self.log('error', 'Session not authenticated. Is someone else using the Browser Remote? Did you enter the correct password?');
		}
	},

	getC100Prop: function (prop) {
		let self = this;

		let cmd = `/api/cam/getprop?r=${prop}`
		let url = `http://${self.config.host}${cmd}`

		if (self.config.verbose) {
			//self.log('debug', 'Getting properties: ' + prop);
		}

		let cookieJarAuth = request.jar()
		let cookie1 = request.cookie('acid=' + self.acid)
		let cookie2 = request.cookie('productId=VKIX00')
		let cookie3 = request.cookie('brlang=' + self.brlang)
		cookieJarAuth.setCookie(cookie1, url)
		cookieJarAuth.setCookie(cookie2, url)
		cookieJarAuth.setCookie(cookie3, url)

		request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
			try {
				if (body) {
					let jsonBody = JSON.parse(body)
					if (jsonBody.res === 'ok') {
						//the command ran ok
						if (jsonBody.seq) {
							self.seq = jsonBody.seq
						}
						
						let curPropValues = [];
						if (self.DATA && self.DATA['O' + prop]) {
							curPropValues = self.DATA['O' + prop]?.rv //current prop values
						}
						let newPropValues = jsonBody['O' + prop]?.rv //new prop values

						if (JSON.stringify(curPropValues) !== JSON.stringify(newPropValues)) {
							//data has changed, update actions
							self.DATA['O' + prop].rv = jsonBody['O' + prop].rv; //update the internal store with whatever data was fetched
							if (self.config.verbose) {
								self.log('debug', 'Property ' + prop + ' has changed, rebuilding actions...');
							}
							self.initActions();
						}
					} else if (jsonBody.res === 'errsession') {
						//someone else is logged in to the browser remote
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Browser Remote already in use');
						self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
						self.Logout()
					} else if (jsonBody.res === 'busy') {
						//do something because it's in the busy state
						self.log('debug', 'Unable to get status, the device is busy');
					} else {
						//something else we didn't catch
						if (self.config.verbose) {
							//self.log('debug', jsonBody.res)
						}
					}
				}
				else {
					//sometimes these props are empty
					//let error = 'Body is empty/undefined. Is this the right device?';
					//self.log('error', 'Error getting updates: ' + error);
				}
			} catch (error) {
				self.updateStatus(InstanceStatus.UnknownError, 'Error getting updates: ' + error);
				self.log('error', 'Error getting updates: ' + error);
			}
		})
	},

	getC100Values: function () { //gets current values/states for the C100
		let self = this;

		let cmd = `/api/cam/getcurprop?seq=0`
		let url = `http://${self.config.host}${cmd}`

		if (self.config.verbose) {
			//self.log('debug', 'Getting current camera values');
		}

		let cookieJarAuth = request.jar()
		let cookie1 = request.cookie('acid=' + self.acid)
		let cookie2 = request.cookie('productId=VKIX00')
		let cookie3 = request.cookie('brlang=' + self.brlang)
		cookieJarAuth.setCookie(cookie1, url)
		cookieJarAuth.setCookie(cookie2, url)
		cookieJarAuth.setCookie(cookie3, url)

		request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
			try {
				if (body) {
					let jsonBody = JSON.parse(body)
					if (jsonBody.res === 'ok') {
						//the command ran ok
						if (jsonBody.seq) {
							self.seq = jsonBody.seq
						}
						
						self.DATA.mode = jsonBody.mode;
						self.DATA.rec = jsonBody.rec;
						self.DATA.com = jsonBody.com;
						self.DATA.batt = jsonBody.batt;
						self.DATA.tc = jsonBody.tc;
						self.DATA.cbtn = jsonBody.cbtn;
						self.DATA.camid = jsonBody.camid;
						self.DATA.Ocf = jsonBody.Ocf;

						self.DATA.Owbm.pv = jsonBody.Owbm.pv;
						self.DATA.Owbv.pv = jsonBody.Owbv.pv;
						self.DATA.Oav.pv = jsonBody.Oav.pv;
						self.DATA.Ossm.pv = jsonBody.Ossm.pv;
						self.DATA.Ossv.pv = jsonBody.Ossv.pv;
						self.DATA.Ogcm.pv = jsonBody.Ogcm.pv;
						self.DATA.Ogcv.pv = jsonBody.Ogcv.pv;
						self.DATA.Oam.pv = jsonBody.Oam.pv;
						self.DATA.nd = jsonBody.nd;
						self.DATA.fframe = jsonBody.fframe;
						self.DATA.pushai = jsonBody.pushai;
						self.DATA.aes = jsonBody.aes;
						self.DATA.aesbtn = jsonBody.aesbtn;
						self.DATA.faceficon = jsonBody.faceficon;

						//check feedbacks and variables
						self.checkVariables();
						self.checkFeedbacks();
					} else if (jsonBody.res === 'errsession') {
						//someone else is logged in to the browser remote
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Browser Remote already in use');
						self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
						self.Logout()
					} else if (jsonBody.res === 'busy') {
						//do something because it's in the busy state
						self.log('debug', 'Unable to get status, the device is busy');
					} else {
						//something else we didn't catch
						if (self.config.verbose) {
							//self.log('debug', jsonBody.res)
						}
					}
				}
				else {
					//let error = 'Body is empty/undefined. Is this the right device?';
					//self.log('error', 'Error getting updates: ' + error);
				}
			} catch (error) {
				self.updateStatus(InstanceStatus.UnknownError, 'Error getting updates: ' + error);
				self.log('error', 'Error getting updates: ' + error);
			}
		})
	},
	
	Logout: function () {
		let self = this;

		clearInterval(self.INTERVAL);
		clearInterval(self.PROPS_INTERVAL);
	
		self.acid = ''
		self.authlevel = ''
		self.productId = ''
		self.seq = 1
	},

	sendCommand: function(cmd) {
		let self = this;

		if (cmd !== undefined) {
			let url = `http://${self.config.host}/api/cam/${cmd}`;
	
			if (self.acid !== '') {
				let cookieJarAuth = request.jar()
				let cookie1 = request.cookie('acid=' + self.acid)
				let cookie2 = request.cookie('productId=' + self.productId)
				let cookie3 = request.cookie('brlang=' + self.brlang)
				cookieJarAuth.setCookie(cookie1, url)
				cookieJarAuth.setCookie(cookie2, url)
				cookieJarAuth.setCookie(cookie3, url)

				if (self.config.verbose) {
					self.log('debug', 'Sending command: ' + cmd);
				}

				request.get({ url: url, jar: cookieJarAuth }, function (error, response, body) {
					try {
						let jsonBody = JSON.parse(body)
	
						if (jsonBody.res === 'ok') {
							//the command ran ok
						} else if (jsonBody.res === 'errsession') {
							//someone else is logged in to the browser remote
							self.updateStatus(InstanceStatus.ConnectionFailure, 'Browser Remote already in use');
							self.log('error', 'Session not authenticated. Is someone else using the Browser Remote?');
						} else {
							//something else we didn't catch
							if (self.config.verbose) {
								//self.log('debug', jsonBody.res)
							}
						}
					}
					catch(error) {
						self.log('error', 'Error with command: ' + error);
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