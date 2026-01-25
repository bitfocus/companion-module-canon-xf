module.exports = {
	initVariables: function () {
		let self = this;

		let variables = [];

		if (self.config.model == 'XF405' || self.config.model == 'XF705' || self.config.model == 'other') {
			variables.push({variableId: 'camid', name: 'Camera ID'});
			variables.push({variableId: 'battery_percent', name: 'Battery Percent'});
			variables.push({variableId: 'battery_remaining', name: 'Battery Remaining'});
			variables.push({variableId: 'fullauto', name: 'Full Auto'});
			variables.push({variableId: 'rec', name: 'Recording'});
			variables.push({variableId: 'rec_fmt', name: 'Recording Format'});
			variables.push({variableId: 'extrec', name: 'Ext Recording'});
			variables.push({variableId: 'tc', name: 'Timecode'});
			variables.push({variableId: 'sdcard_a_state', name: 'SD Card A State'});
			variables.push({variableId: 'sdcard_a_remaining', name: 'SD Card A Remaining'});
			variables.push({variableId: 'sdcard_b_state', name: 'SD Card B State'});
			variables.push({variableId: 'sdcard_b_remaining', name: 'SD Card B Remaining'});
			variables.push({variableId: 'wb_mode', name: 'WB Mode'});
			variables.push({variableId: 'awb_kelvinvalue', name: 'AWB Kelvin Value'});
			variables.push({variableId: 'awb_ccvalue', name: 'AWB CC Value'});
			variables.push({variableId: 'seta_kelvinvalue', name: 'Set A Kelvin Value'});
			variables.push({variableId: 'seta_ccvalue', name: 'Set A CC Value'});
			variables.push({variableId: 'setb_kelvinvalue', name: 'Set B Kelvin Value'});
			variables.push({variableId: 'setb_ccvalue', name: 'Set B CC Value'});
			variables.push({variableId: 'daylight_kelvinvalue', name: 'Daylight Kelvin Value'});
			variables.push({variableId: 'daylight_ccvalue', name: 'Daylight CC Value'});
			variables.push({variableId: 'tungsten_kelvinvalue', name: 'Tungsten Kelvin Value'});
			variables.push({variableId: 'tungsten_ccvalue', name: 'Tungsten CC Value'});
			variables.push({variableId: 'kelvinvalue', name: 'Kelvin Value'});
			variables.push({variableId: 'neutraldensity_value', name: 'Neutral Density Value'});
			variables.push({variableId: 'iris_mode', name: 'Iris Mode'});
			variables.push({variableId: 'iris_value', name: 'Iris Value'});
			variables.push({variableId: 'isogain_mode', name: 'ISO/Gain Mode'});
			variables.push({variableId: 'isogain_value', name: 'ISO/Gain Value'});
			variables.push({variableId: 'shutter_mode', name: 'Shutter Mode'});
			variables.push({variableId: 'shutter_step', name: 'Shutter Step'});
			variables.push({variableId: 'shutter_value', name: 'Shutter Value'});
			variables.push({variableId: 'aeshift_value', name: 'AE Shift Value'});
			variables.push({variableId: 'afmode', name: 'AF Mode'});
			variables.push({variableId: 'facedetection', name: 'Face Detection'});
			variables.push({variableId: 'focusguide', name: 'Focus Guide'});
			variables.push({variableId: 'zoom_speed', name: 'Zoom Speed'});
			variables.push({variableId: 'zoom_position', name: 'Zoom Position'});
		}
		else if (self.config.model == 'C100' || self.config.model == 'other') {
			variables.push({variableId: 'camid', name: 'Camera ID'});
			variables.push({variableId: 'batt', name: 'Battery'});
			variables.push({variableId: 'tc', name: 'Timecode'});
			variables.push({variableId: 'sdcard_selected', name: 'SD Card Selected'});
			variables.push({variableId: 'sdcard_a_remaining', name: 'SD Card A Remaining'});
			variables.push({variableId: 'sdcard_b_remaining', name: 'SD Card B Remaining'});

			variables.push({variableId: 'wb_mode', name: 'WB Mode'});
			variables.push({variableId: 'wb_value', name: 'WB Value'});

			variables.push({variableId: 'af_lock', name: 'Auto Focus Lock'});
			variables.push({variableId: 'af_mode', name: 'Auto Focus Mode'});

			variables.push({variableId: 'iris_value', name: 'Iris Value'});

			variables.push({variableId: 'gain_mode', name: 'ISO/Gain Mode'});
			variables.push({variableId: 'gain_value', name: 'ISO/Gain Value'});

			variables.push({variableId: 'shutter_mode', name: 'Shutter Mode'});
			variables.push({variableId: 'shutter_value', name: 'Shutter Value'});
		}
		else {

		}

		self.setVariableDefinitions(variables);
	},

	checkVariables: function () {
		let self = this;

		try {
			if (self.DATA) {
				let variableObj = {};
				if (self.config.model == 'XF405') {
					variableObj.camid = self.DATA?.camid || '';
					variableObj.battery_percent = self.DATA?.Opower?.Obatt?.percent|| '';
					variableObj.battery_remaining = self.DATA?.Opower?.Obatt?.rtime || '';
					variableObj.fullauto = self.DATA?.Ofullauto?.pv || '';
					variableObj.rec = self.DATA?.rec || '';
					variableObj.rec_fmt = self.DATA?.recfmt || '';
					variableObj.extrec = self.DATA?.extrec || '';
					variableObj.tc = self.DATA?.tc || '';
					variableObj.sdcard_a_state = self.DATA?.Omedia?.Osda?.state || '';
					variableObj.sdcard_a_remaining = self.DATA?.Omedia?.Osda?.rtime || '';
					variableObj.sdcard_b_state = self.DATA?.Omedia?.Osdb?.state || '';
					variableObj.sdcard_b_remaining = self.DATA?.Omedia?.Osdb?.rtime || '';
					variableObj.wb_mode = self.DATA?.Owbinfo?.Omode?.pv || '';
					variableObj.awb_kelvinvalue = self.DATA?.Owbinfo?.Oawb?.kelvinvalue || '';
					variableObj.awb_ccvalue = self.DATA?.Owbinfo?.Oawb?.ccvalue || '';
					variableObj.seta_kelvinvalue = self.DATA?.Owbinfo?.Oseta?.Ovalue?.kelvinvalue || '';
					variableObj.seta_ccvalue = self.DATA?.Owbinfo?.Oseta?.Ovalue?.ccvalue || '';
					variableObj.setb_kelvinvalue = self.DATA?.Owbinfo?.Osetb?.Ovalue?.kelvinvalue || '';
					variableObj.setb_ccvalue = self.DATA?.Owbinfo?.Osetb?.Ovalue?.ccvalue || '';
					variableObj.daylight_kelvinvalue = self.DATA?.Owbinfo?.Odaylight?.kelvinvalue || '';
					variableObj.daylight_ccvalue = self.DATA?.Owbinfo?.Odaylight?.ccvalue || '';
					variableObj.tungsten_kelvinvalue = self.DATA?.Owbinfo?.Otungsten?.kelvinvalue || '';
					variableObj.tungsten_ccvalue = self.DATA?.Owbinfo?.Otungsten?.ccvalue || '';
					variableObj.kelvinvalue = self.DATA?.Owbinfo?.Okelvin?.kelvinvalue || '';
					variableObj.neutraldensity_value = self.DATA?.Ondinfo?.Ovalue?.pv || '';
					variableObj.iris_mode = self.DATA?.Oiris?.Omode?.pv || '';
					variableObj.iris_value = self.DATA?.Oirisinfo?.Ovalue?.pv || '';
					variableObj.isogain_mode = self.DATA?.Oisogaininfo?.Omode?.pv || '';
					variableObj.isogain_value = self.DATA?.Oisogaininfo?.Ovalue?.pv || '';
					variableObj.shutter_mode = self.DATA?.Oshutter?.Omode?.pv || '';
					variableObj.shutter_step = self.DATA?.Oshutter?.Ostep?.pv || '';
					variableObj.shutter_value = self.DATA?.Oshutterinfo?.Ovalue?.pv || '';
					variableObj.aeshift_value = self.DATA?.Oaesinfo?.Ovalue?.pv || '';
					variableObj.afmode = self.DATA?.Ofocusinfo?.Oafmode?.pv || '';
					variableObj.facedetection = self.DATA?.Ofocusinfo?.Ofacedat?.pv || '';
					variableObj.focusguide = self.DATA?.Ofocusinfo?.Oguide?.pv || '';
					variableObj.zoom_speed = self.DATA?.Ozoom?.speed || '';
					variableObj.zoom_position = self.DATA?.Ozoom?.pos || '';
				}
				else if (self.config.model == 'XF705' || self.config.model == 'other') {
					variableObj.camid = self.DATA?.camid || '';
					variableObj.battery_percent = self.DATA?.Opower?.Obatt?.percent|| '';
					variableObj.battery_remaining = self.DATA?.Opower?.Obatt?.rtime || '';
					variableObj.fullauto = self.DATA?.Ofullauto?.pv || '';
					variableObj.rec = self.DATA?.rec || '';
					variableObj.rec_fmt = self.DATA?.recfmt || '';
					variableObj.extrec = self.DATA?.extrec || '';
					variableObj.tc = self.DATA?.tc || '';
					variableObj.sdcard_a_state = self.DATA?.Omedia?.Osda?.state || '';
					variableObj.sdcard_a_remaining = self.DATA?.Omedia?.Osda?.rtime || '';
					variableObj.sdcard_b_state = self.DATA?.Omedia?.Osdb?.state || '';
					variableObj.sdcard_b_remaining = self.DATA?.Omedia?.Osdb?.rtime || '';
					variableObj.wb_mode = self.DATA?.Owbinfo?.Omode?.pv || '';
					variableObj.awb_kelvinvalue = self.DATA?.Owbinfo?.Oawb?.kelvinvalue || '';
					variableObj.awb_ccvalue = self.DATA?.Owbinfo?.Oawb?.ccvalue || '';
					variableObj.seta_kelvinvalue = self.DATA?.Owbinfo?.Oseta?.Ovalue?.kelvinvalue || '';
					variableObj.seta_ccvalue = self.DATA?.Owbinfo?.Oseta?.Ovalue?.ccvalue || '';
					variableObj.setb_kelvinvalue = self.DATA?.Owbinfo?.Osetb?.Ovalue?.kelvinvalue || '';
					variableObj.setb_ccvalue = self.DATA?.Owbinfo?.Osetb?.Ovalue?.ccvalue || '';
					variableObj.daylight_kelvinvalue = self.DATA?.Owbinfo?.Odaylight?.kelvinvalue || '';
					variableObj.daylight_ccvalue = self.DATA?.Owbinfo?.Odaylight?.ccvalue || '';
					variableObj.tungsten_kelvinvalue = self.DATA?.Owbinfo?.Otungsten?.kelvinvalue || '';
					variableObj.tungsten_ccvalue = self.DATA?.Owbinfo?.Otungsten?.ccvalue || '';
					variableObj.kelvinvalue = self.DATA?.Owbinfo?.Ovalue?.kelvinvalue || '';
					variableObj.neutraldensity_value = self.DATA?.Ondinfo?.Ovalue?.pv || '';
					variableObj.iris_mode = self.DATA?.Oiris?.Omode?.pv || '';
					variableObj.iris_value = self.DATA?.Oiris?.Ovalue?.pv || '';
					variableObj.isogain_mode = self.DATA?.Oisogaininfo?.Omode?.pv || '';
					variableObj.isogain_value = self.DATA?.Oisogaininfo?.Ovalue?.pv || '';
					variableObj.shutter_mode = self.DATA?.Oshutter?.Omode?.pv || '';
					variableObj.shutter_step = self.DATA?.Oshutter?.Ostep?.pv || '';
					variableObj.shutter_value = self.DATA?.Oshutter?.Ovalue?.pv || '';
					variableObj.aeshift_value = self.DATA?.Oaesinfo?.Ovalue?.pv || '';
					variableObj.afmode = self.DATA?.Ofocusinfo?.Oafmode?.pv || '';
					variableObj.facedetection = self.DATA?.Ofocusinfo?.Ofacedat?.pv || '';
					variableObj.focusguide = self.DATA?.Ofocusinfo?.Oguide?.pv || '';
					variableObj.zoom_speed = self.DATA?.Ozoom?.speed || '';
					variableObj.zoom_position = self.DATA?.Ozoom?.pos || '';
				}
				else if (self.config.model == 'C100' || self.config.model == 'other') {
					variableObj.camid = self.DATA?.camid || '';
					variableObj.batt = self.DATA?.batt || '';
					variableObj.tc = self.DATA?.tc || '';
					variableObj.sdcard_selected = self.DATA?.Ocf?.sel || '';
					variableObj.sdcard_a_remaining = self.DATA?.Ocf?.artime || '';
					variableObj.sdcard_b_remaining = self.DATA?.Ocf?.brtime || '';

					variableObj.wb_mode = self.DATA?.Owbm?.pv || '';	
					variableObj.wb_value = self.DATA?.Owbv?.pv || '';

					if (self.DATA?.fframe == 'contin') {
						variableObj.af_lock = 'On';
						variableObj.af_mode = 'Continuous';
					}
					else {
						variableObj.af_mode = 'One Shot';
						if (self.DATA?.fframe == 'run') {
							variableObj.af_lock = 'On';
						}
						else {
							variableObj.af_lock = 'Off';
						}
					}

					variableObj.iris_value = self.DATA?.Oav?.pv || '';

					variableObj.gain_mode = self.DATA?.Ogcm?.pv || '';
					if (variableObj.gain_mode == 'iso') {
						variableObj.gain_mode = 'ISO';
					}
					else if (variableObj.gain_mode == 'gain') {
						variableObj.gain_mode = 'Gain';
					}

					variableObj.gain_value = self.DATA?.Ogcv?.pv || '';

					variableObj.shutter_mode = self.DATA?.Ossm?.pv || '';
					variableObj.shutter_value = self.DATA?.Ossv?.pv || '';
				}
				else {

				}

				self.setVariableValues(variableObj);
			}
		}
		catch(error) {
			self.log('error', 'Error setting variables: ' + error);
		}
	}
}
