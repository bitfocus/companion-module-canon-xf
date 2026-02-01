function buildList(data) {
	//builds a list of objects from the data
	if (data === undefined) {
		return [ { id: 'none', label: 'No Values Available' }];
	}

	let list = [];
	for (let i = 0; i < data.length; i++) {
		list.push({ id: data[i], label: data[i] });
	}
	return list;
}

module.exports = {
	initActions: function () {
		let self = this;
		let actions = {};
		
		if (self.config.model == 'XF405' || self.config.model == 'XF705' || self.config.model == 'other') {
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

			actions.iris_set = {
				name: 'Set Iris Value',
				options: [
					{
						type: 'dropdown',
						label: 'Iris Value',
						id: 'value',
						default: '1.8',
						choices: self.iris_values,
					},
				],
				callback: async function (action) {
					let cmd = 'drivelens?iris=' + action.options.value;
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

			actions.shutter_up = {
				name: 'Shutter Up',
				options: [],
				callback: async function (action) {
					let cmd = 'drivelens?shutter=plus';
					self.sendCommand(cmd);
				}
			}
			
			actions.shutter_down = {
				name: 'Shutter Down',
				options: [],
				callback: async function (action) {
					let cmd = 'drivelens?shutter=minus';
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

			actions.rec_mode = {
				name: 'Select exposure mode',
				options: [
					{
						type: 'dropdown',
						id: 'mode',
						default: 'manual',
						choices: [
							{ id: 'p', label: 'P' },
							{ id: 'tv', label: 'Tv' },
							{ id: 'av', label: 'Av' },
							{ id: 'manual', label: 'M' },
						],
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?recmode=' + action.options.mode;
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

			
			actions.set_wb_1 = {
				name: 'Set AWB Custom Value 1',
				options: [],
				callback: async function (action) {
					let cmd = 'cmdwb?wbset=a';
					self.sendCommand(cmd);
				}
			}

			actions.set_wb_2 = {
				name: 'Set AWB Custom Value 2',
				options: [],
				callback: async function (action) {
					let cmd = 'cmdwb?wbset=b';
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
				name: 'Set Kelvin Value',
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

			actions.wbkelvin_up = {
				name: 'Kelvin Up',
				options: [],
				callback: async function (action) {
					//determine the current Okelvin value and go up one step and then send that command
					let current = self.DATA?.Owbinfo?.Okelvin?.kelvinvalue;
					self.log('debug', 'current wb ' + current);
					let index = self.kelvin_values.findIndex(x => x.id == current);
					self.log('debug', 'current wb index ' + index);
					self.log('debug', 'self.kelvin_values.length ' + self.kelvin_values.length);

					if (index < self.kelvin_values.length - 1) {
						self.log('debug', 'setting kelvin ' + self.kelvin_values[index + 1].id);

						let cmd = 'setprop?wbvk=' + self.kelvin_values[index + 1].id;
						self.sendCommand(cmd);
					}
				}
			}

			actions.wbkelvin_down = {
				name: 'Kelvin Down',
				options: [],
				callback: async function (action) {
					//determine the current Okelvin value and go up one step and then send that command
					let current = self.DATA?.Owbinfo?.Okelvin?.kelvinvalue;
					self.log('debug', 'current wb ' + current);
					let index = self.kelvin_values.findIndex(x => x.id == current);
					self.log('debug', 'current wb index ' + index);

					if (index > 0) {
						self.log('debug', 'setting kelvin ' + self.kelvin_values[index - 1].id);

						let cmd = 'setprop?wbvk=' + self.kelvin_values[index - 1].id;
						self.sendCommand(cmd);
					}
				}
			}

			actions.focus = {
				name: self.config.model + ': ' + 'Focus Adjustment',
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'level',
						default: 'near1',
						choices: [
							{ id: 'near1', label: 'Near 1 <' },
							{ id: 'near2', label: 'Near 2 <<' },
							{ id: 'near3', label: 'Near 3 <<<' },
							{ id: 'far1', label: 'Far 1 >' },
							{ id: 'far2', label: 'Far 2 >>' },
							{ id: 'far3', label: 'Far 3 >>>' },
						],
					},
				],
				callback: async function (action) {
					let cmd = 'drivelens?fl=' + action.options.level;
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
		}
		else if (self.config.model == 'C100' || self.config.model == 'other') {
			actions.whitebalance_setmode = {
				name: self.config.model + ': ' + 'Set White Balance Mode',
				options: [
					{
						type: 'dropdown',
						id: 'type',
						default: buildList(self.DATA?.Owbm?.rv)[0].id,
						choices: buildList(self.DATA?.Owbm?.rv)
					}
				],
				callback: async function (action) {
					let cmd = 'setprop?wbm=' + action.options.type;
					self.sendCommand(cmd);
				}
			}

			actions.whitebalance_setvalue = {
				name: self.config.model + ': ' + 'Set White Balance Value',
				options: [
					{
						type: 'dropdown',
						id: 'value',
						default: buildList(self.DATA?.Owbv?.rv)[0].id,
						choices: buildList(self.DATA?.Owbv?.rv)
					}
				],
				callback: async function (action) {
					let cmd = 'setprop?wbv=' + action.options.value;
					self.sendCommand(cmd);
				}
			}

			actions.focus_aflock_toggle = {
				name: self.config.model + ': ' + 'Toggle AF Lock',
				options: [],
				callback: async function (action) {
					let cmd = 'drivelens?af=togglelock';
					self.sendCommand(cmd);
				}
			}

			actions.focus_mode = {
				name: self.config.model + ': ' + 'Switch Focus Mode (One-Shot/Continuous)',
				options: [],
				callback: async function (action) {
					let cmd = 'drivelens?sw=afmode';
					self.sendCommand(cmd);
				}
			}

			actions.focus = {
				name: self.config.model + ': ' + 'Focus Adjustment',
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'level',
						default: 'near1',
						choices: [
							{ id: 'near1', label: 'Near 1 <' },
							{ id: 'near2', label: 'Near 2 <<' },
							{ id: 'near3', label: 'Near 3 <<<' },
							{ id: 'far1', label: 'Far 1 >' },
							{ id: 'far2', label: 'Far 2 >>' },
							{ id: 'far3', label: 'Far 3 >>>' },
						],
					},
				],
				callback: async function (action) {
					let cmd = 'drivelens?fl=' + action.options.level;
					self.sendCommand(cmd);
				}
			}

			actions.aperturevalue_set = {
				name: self.config.model + ': ' + 'Set Aperture Value (Iris)',
				options: [
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						default: buildList(self.DATA?.Oav?.rv)[0].id,
						choices: buildList(self.DATA?.Oav?.rv)
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?av=' + action.options.value;
					self.sendCommand(cmd);
				}
			}

			actions.aperturevalue_up = {
				name: self.config.model + ': ' + 'Aperture Up',
				options: [],
				callback: async function (action) {
					//determine the current 0av value and go up one step and then send that command
					let current = self.DATA?.Oav?.pv;
					let index = self.DATA?.Oav?.rv.findIndex(x => x == current);
					if (index < self.DATA?.Oav?.rv.length - 1) {
						let cmd = 'setprop?av=' + self.DATA?.Oav?.rv[index + 1];
						self.sendCommand(cmd);
					}
				}
			}

			actions.aperturevalue_down = {
				name: self.config.model + ': ' + 'Aperture Down',
				options: [],
				callback: async function (action) {
					//determine the current 0av value and go down one step and then send that command
					let current = self.DATA?.Oav?.pv;
					let index = self.DATA?.Oav?.rv.findIndex(x => x == current);
					if (index > 0) {
						let cmd = 'setprop?av=' + self.DATA?.Oav?.rv[index - 1];
						self.sendCommand(cmd);
					}
				}
			}

			actions.gain_setmode = {
				name: self.config.model + ': ' + 'Set Gain Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'mode',
						default: buildList(self.DATA?.Ogcm?.rv)[0].id,
						choices: buildList(self.DATA?.Ogcm?.rv)
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?gcm=' + action.options.mode;
					self.sendCommand(cmd);
				}
			}

			actions.gain_setvalue = {
				name: self.config.model + ': ' + 'Set Gain Value',
				options: [
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						default: buildList(self.DATA?.Ogcv?.rv)[0].id,
						choices: buildList(self.DATA?.Ogcv?.rv)
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?gcv=' + action.options.value;
					self.sendCommand(cmd);
				}
			}

			actions.shutterspeed_setmode = {
				name: self.config.model + ': ' + 'Set Shutter Speed Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'mode',
						default: buildList(self.DATA?.Ossm?.rv)[0].id,
						choices: buildList(self.DATA?.Ossm?.rv)
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?ssm=' + action.options.mode;
					self.sendCommand(cmd);
				}
			}

			actions.shutterspeed_setvalue = {
				name: self.config.model + ': ' + 'Set Shutter Speed Value',
				options: [
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						default: buildList(self.DATA?.Ossv?.rv)[0].id,
						choices: buildList(self.DATA?.Ossv?.rv)
					},
				],
				callback: async function (action) {
					let cmd = 'setprop?ssv=' + action.options.value;
					self.sendCommand(cmd);
				}
			}

			actions.record_trigger= {
				name: self.config.model + ': ' + 'Trigger Recording  Start/Stop',
				options: [],
				callback: async function (action) {
					let cmd = 'rec?cmd=trig';
					self.sendCommand(cmd);
				}
			}
			
			actions.slot_select = {
				name: self.config.model + ': ' + 'SD Card Slot Select',
				options: [],
				callback: async function (action) {
					let cmd = 'rec?cmd=slot';
					self.sendCommand(cmd);
				}
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
