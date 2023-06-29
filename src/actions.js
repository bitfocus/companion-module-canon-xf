module.exports = {
	initActions: function () {
		let self = this;
		let actions = {};
		
		actions.gain_up = {
			name: 'Gain Up',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?gain=plus';
				self.sendCommand(cmd);
			}
		}
		
		actions.gain_down = {
			name: 'Gain Down',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?gain=minus';
				self.sendCommand(cmd);
			}
		}
		
		actions.iris_up = {
			name: 'Iris Up',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?iris=plus';
				self.sendCommand(cmd);
			}
		}
		
		actions.iris_down = {
			name: 'Iris Down',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?iris=minus';
				self.sendCommand(cmd);
			}
		}
		
		actions.focus = {
			name: 'Focus Fine Adjustment',
			options: [
				{
					type: 'dropdown',
					label: 'Level',
					id: 'level',
					default: 'near1',
					choices: [
						{ id: 'near1', label: 'Near 1' },
						{ id: 'near2', label: 'Near 2' },
						{ id: 'near3', label: 'Near 3' },
						{ id: 'far1', label: 'Far 1' },
						{ id: 'far2', label: 'Far 2' },
						{ id: 'far3', label: 'Far 3' },
					],
				},
			],
			callback: async function (action) {
				let cmd = 'drivelens?focus=' + action.options.level;
				self.sendCommand(cmd);
			}
		}
		
		actions.trigger_rec = {
			name: 'Trigger Recording',
			options: [],
			callback: async function (action) {
				let cmd = 'rec?cmd=trig';
				self.sendCommand(cmd);
			}
		}
		
		actions.select_sd = {
			name: 'Select SD Card',
			options: [],
			callback: async function (action) {
				let cmd = 'rec?cmd=slot';
				self.sendCommand(cmd);
			}
		}
		
		actions.push_auto_iris = {
			name: 'Push Auto Iris',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?ai=push';
				self.sendCommand(cmd);
			}
		}
		
		actions.auto_iris = {
			name: 'Auto Iris',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?am=autoiris';
				self.sendCommand(cmd);
			}
		}
		
		actions.manual_iris = {
			name: 'Manual Iris',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?am=maniris';
				self.sendCommand(cmd);
			}
		}
		
		actions.face_detection_focus = {
			name: 'Face Detection Focus',
			options: [],
			callback: async function (action) {
				let cmd = 'drivelens?focus=track';
				self.sendCommand(cmd);
			}
		}
		
		actions.zoom_preset = {
			name: 'Zoom to preset location',
			options: [
				{
					type: 'dropdown',
					label: 'Level',
					id: 'level',
					default: 'preset1',
					choices: [
						{ id: 'preset1', label: 'Preset 1' },
						{ id: 'preset2', label: 'Preset 2' },
						{ id: 'preset3', label: 'Preset 3' },
						{ id: 'preset4', label: 'Preset 4' },
						{ id: 'preset5', label: 'Preset 5' },
						{ id: 'preset6', label: 'Preset 6' },
					]
				}
			],
			callback: async function (action) {
				let cmd = 'drivelens?stepzoom=' + action.options.level;
				self.sendCommand(cmd);
			}
		}
		
		actions.zoom_fine = {
			name: 'Zoom Fine Adjustment',
			options: [
				{
					type: 'dropdown',
					label: 'Zoom Direction',
					id: 'direction',
					default: 'tele1',
					choices: [
						{ id: 'tele1', label: 'Zoom In' },
						{ id: 'wide1', label: 'Zoom Out' },
					]
				}
			],
			callback: async function (action) {
				let cmd = 'drivelens?zoom=' + action.options.direction;
				self.sendCommand(cmd);
			}
		}
		
		actions.check_mark_clip = {
			name: 'Check Mark Clip',
			options: [],
			callback: async function (action) {
				let cmd = 'markclip?type=check';
				self.sendCommand(cmd);
			}
		}
		
		actions.mark_clip = {
			name: 'Mark Clip',
			options: [],
			callback: async function (action) {
				let cmd = 'markclip?type=ok';
				self.sendCommand(cmd);
			}
		}
		
		actions.manual_focus_enable = {
			name: 'Enable Manual Focus',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?afm=off';
				self.sendCommand(cmd);
			}
		}
		
		actions.automatic_focus_enable = {
			name: 'Enable Automatic Focus',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?afm=continuous';
				self.sendCommand(cmd);
			}
		}
		
		actions.shutter_mode = {
			name: 'Select Shutter Function',
			options: [
				{
					type: 'dropdown',
					id: 'function',
					default: 'off',
					choices: [
						{ id: 'slow', label: 'Slow Shutter Mode' },
						{ id: 'clear', label: 'Clear Scan Shutter Mode' },
						{ id: 'angle', label: 'Angle Shutter Mode' },
						{ id: 'speed', label: 'Speed Shutter Mode' },
						{ id: 'auto', label: 'Auto Shutter Mode' },
						{ id: 'off', label: 'Disable Shutter Mode' },
						{ id: 'fine', label: 'Fine Shutter Mode' },
						{ id: 'normal', label: 'Normal Shutter Mode' },
					],
				},
			],
			callback: async function (action) {
				let cmd = 'setprop?ssm=' + action.options.function;
				self.sendCommand(cmd);
			}
		}

		actions.nd_ud = {
			name: 'ND Up/Down',
			options: [
				{
					type: 'dropdown',
					id: 'direction',
					default: 'plus',
					choices: [
						{ id: 'plus', label: 'ND Up' },
						{ id: 'minus', label: 'ND Down' },
					],
				},
			],
			callback: async function (action) {
				let cmd = 'drivelens?nd=' + action.options.direction;
				self.sendCommand(cmd);
			}
		}
		
		actions.nd_mode = {
			name: 'Select ND Function',
			options: [
				{
					type: 'dropdown',
					id: 'function',
					default: 'off',
					choices: [
						{ id: 'off', label: 'ND Off' },
						{ id: '1/4', label: 'ND 1/4' },
						{ id: '1/16', label: 'ND 1/16' },
						{ id: '1/64', label: 'ND 1/64' },
					],
				},
			],
			callback: async function (action) {
				let cmd = 'drivelens?ndv=' + action.options.function;
				self.sendCommand(cmd);
			}
		}
		
		actions.full_auto_enable = {
			name: 'Enable Full Auto',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?fullauto=on';
				self.sendCommand(cmd);
			}
		}
		
		actions.full_auto_disable = {
			name: 'Disable Full Auto',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?fullauto=off';
				self.sendCommand(cmd);
			}
		}
		
		actions.awb = {
			name: 'Auto White Balance',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?wbm=awb';
				self.sendCommand(cmd);
			}
		}
		
		actions.awb_lock = {
			name: 'Auto White Balance Lock',
			options: [],
			callback: async function (action) {
				let cmd = 'cmdwb?awbhold=trig';
				self.sendCommand(cmd);
			}
		}
		
		actions.set_awbcustom_1 = {
			name: 'Set AWB Custom 1',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?wbm=seta';
				self.sendCommand(cmd);
			}
		}
		
		actions.set_awbcustom_2 = {
			name: 'Set AWB Custom 2',
			options: [],
			callback: async function (action) {
				cmd = 'setprop?wbm=setb';
				self.sendCommand(cmd);
			}
		}
		
		actions.set_whitebalance = {
			name: 'Set White Balance',
			options: [
				{
					type: 'dropdown',
					id: 'type',
					default: 'tungsten',
					choices: [
						{id: 'tungsten', label: 'Tungsten'},
						{id: 'kelvin', label: 'Kelvin'},
						{id: 'daylight', label: 'Daylight'}
					]
				}
			],
			callback: async function (action) {
				let cmd = 'setprop?wbm=' + action.options.type;
			}
		}
		
		actions.enable_kelvin_wb_mode = {
			name: 'Enable Kelvin White Balance Mode',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?wbm=kelvin';
				self.sendCommand(cmd);
			}
		}
		
		actions.set_kelvin_wb = {
			name: 'Set White Balance',
			options: [
				{
					type: 'dropdown',
					id: 'temperature',
					default: '3200',
					choices: self.kelvin_values,
				},
			],
			callback: async function (action) {
				let cmd = 'setprop?wbvk=' + action.options.temperature;
				self.sendCommand(cmd);
			}
		}
		
		actions.face_tracking_enable = {
			name: 'Enable Face Tracking',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?fdat=on';
				self.sendCommand(cmd);
			}
		}
		
		actions.face_tracking_disable = {
			name: 'Disable Face Tracking',
			options: [],
			callback: async function (action) {
				let cmd = 'setprop?fdat=off';
				self.sendCommand(cmd);
			}
		}
		
		actions.logout = {
			name: 'Logout of the Browser Remote Session',
			options: [],
			callback: async function (action) {
				self.Logout();
			}
		}
		
		actions.login = {
			name: 'Login to the Browser Remote Session',
			options: [],
			callback: async function (action) {
				self.Login();
			}
		}

		self.setActionDefinitions(actions);
	}
}