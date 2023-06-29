module.exports = {
	initVariables: function () {
		let self = this;

		let variables = [];

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

		self.setVariableDefinitions(variables);
	},

	checkVariables: function () {
		let self = this;

		/*
			{"res":"ok","seq":1,"com":1,"mode":"ctrl","camid":"XF705   ","Opower":{"Obatt":{"percent":"non","rtime":"non"}},"rec":"off","extrec":"off","tc":"08:13:27.09","lvactfarea":"dci_80x80","Omedia":{"Osda":{"state":"n","rtime":-1,"select":0},"Osdb":{"state":"n","rtime":-1,"select":0}},"Owbinfo":{"Omode":{"pv":"tungsten","en":1},"Oawb":{"kelvinvalue":"--","ccvalue":"--","en":1},"Oseta":{"Ovalue":{"kelvinvalue":"5600","ccvalue":"0","en":1},"Osts":{"pv":"comp","en":1}},"Osetb":{"Ovalue":{"kelvinvalue":"5600","ccvalue":"0","en":1},"Osts":{"pv":"comp","en":1}},"Odaylight":{"kelvinvalue":"5600","ccvalue":"0","en":1},"Otungsten":{"kelvinvalue":"2940","ccvalue":"0","en":1},"Okelvin":{"kelvinvalue":"5600","ccvalue":"0","en":1},"Oawbhold":{"pv":"off","en":0},"propupdate":0},"Ondinfo":{"Ovalue":{"pv":"off","en":1},"adjen":1,"propupdate":0,"opedirection":"non"},"Oirisinfo":{"Omode":{"pv":"maniris","en":1},"Ovalue":{"pv":"F4.4","en":1},"Opushai":{"pv":"stop","en":1},"adjen":1,"Onumline":{"seg":3,"maxseg":15,"pos":127,"maxpos":254},"propupdate":0},"Oisogaininfo":{"Omode":{"pv":"mangain","en":1},"Ostep":{"pv":"normal","en":1},"Ovalue":{"pv":"15.0","en":1},"adjen":1,"propupdate":0},"Oshutterinfo":{"Omode":{"pv":"speed","en":1},"Ostep":{"pv":"normal","en":1},"Ovalue":{"pv":"1/75","en":1},"adjen":1,"propupdate":0},"Oaesinfo":{"Ovalue":{"pv":"--","en":0},"adjen":0,"propupdate":1},"Ofocusinfo":{"Oafmode":{"pv":"continuous","en":1},"Ofacedat":{"pv":"off","en":1},"Ofguide":{"pv":"off","en":1},"trctrlen":0,"tcctrlen":0,"Ofctrl":{"pv":"","en":1}},"Offrame":{"Oframeinfo":{"ftype":"non","farrowdisp":[0,0,0,0,0,0,0,0,0],"arrowsign":[0,0,0,0,0,0,0,0,0],"arrowangle":[0,0,0,0,0,0,0,0,0],"color":[0,0,0,0,0,0,0,0,0],"width":[0,0,0,0,0,0,0,0,0],"height":[0,0,0,0,0,0,0,0,0],"xcoord":[0,0,0,0,0,0,0,0,0],"ycoord":[0,0,0,0,0,0,0,0,0]},"Ofguideframeinfo":{"ftype":"non","farrowdisp":[0,0,0,0,0,0,0,0,0],"arrowsign":[0,0,0,0,0,0,0,0,0],"arrowangle":[0,0,0,0,0,0,0,0,0],"color":[0,0,0,0,0,0,0,0,0],"width":[0,0,0,0,0,0,0,0,0],"height":[0,0,0,0,0,0,0,0,0],"xcoord":[0,0,0,0,0,0,0,0,0],"ycoord":[0,0,0,0,0,0,0,0,0]}},"Ometa":{"metamode":"ctrl","metaclip":[""]},"Ozoom":{"speed":2,"pos":47,"status":"stop"},"recfmt":"hevc","irmode":"off","Ofullauto":{"pv":"off","en":1,"propupdate":0}}
		*/

		try {
			if (self.DATA) {
				let variableObj = {};

				console.log(self.DATA);
				
				variableObj.camid = self.DATA.camid || '';
				variableObj.battery_percent = self.DATA.Opower?.Obatt?.percent|| '';
				variableObj.battery_remaining = self.DATA.Opower?.Obatt?.rtime || '';
				variableObj.fullauto = self.DATA.Ofullauto?.pv || '';
				variableObj.rec = self.DATA.rec || '';
				variableObj.rec_fmt = self.DATA.recfmt || '';
				variableObj.extrec = self.DATA.extrec || '';
				variableObj.tc = self.DATA.tc || '';
				variableObj.sdcard_a_state = self.DATA.Omedia?.Osda?.state || '';
				variableObj.sdcard_a_remaining = self.DATA.Omedia?.Osda?.rtime || '';
				variableObj.sdcard_b_state = self.DATA.Omedia?.Osdb?.state || '';
				variableObj.sdcard_b_remaining = self.DATA.Omedia?.Osdb?.rtime || '';
				variableObj.wb_mode = self.DATA.Owbinfo?.Omode?.pv || '';
				variableObj.awb_kelvinvalue = self.DATA.Owbinfo?.Oawb?.kelvinvalue || '';
				variableObj.awb_ccvalue = self.DATA.Owbinfo?.Oawb?.ccvalue || '';
				variableObj.seta_kelvinvalue = self.DATA.Owbinfo?.Oseta?.Ovalue?.kelvinvalue || '';
				variableObj.seta_ccvalue = self.DATA.Owbinfo?.Oseta?.Ovalue?.ccvalue || '';
				variableObj.setb_kelvinvalue = self.DATA.Owbinfo?.Osetb?.Ovalue?.kelvinvalue || '';
				variableObj.setb_ccvalue = self.DATA.Owbinfo?.Osetb?.Ovalue?.ccvalue || '';
				variableObj.daylight_kelvinvalue = self.DATA.Owbinfo?.Odaylight?.kelvinvalue || '';
				variableObj.daylight_ccvalue = self.DATA.Owbinfo?.Odaylight?.ccvalue || '';
				variableObj.tungsten_kelvinvalue = self.DATA.Owbinfo?.Otungsten?.kelvinvalue || '';
				variableObj.tungsten_ccvalue = self.DATA.Owbinfo?.Otungsten?.ccvalue || '';
				variableObj.kelvinvalue = self.DATA.Owbinfo?.Ovalue?.kelvinvalue || '';
				variableObj.neutraldensity_value = self.DATA.Ondinfo?.Ovalue?.pv || '';
				variableObj.iris_mode = self.DATA.Oiris?.Omode?.pv || '';
				variableObj.iris_value = self.DATA.Oiris?.Ovalue?.pv || '';
				variableObj.isogain_mode = self.DATA.Oisogaininfo?.Omode?.pv || '';
				variableObj.isogain_value = self.DATA.Oisogaininfo?.Ovalue?.pv || '';
				variableObj.shutter_mode = self.DATA.Oshutter?.Omode?.pv || '';
				variableObj.shutter_step = self.DATA.Oshutter?.Ostep?.pv || '';
				variableObj.shutter_value = self.DATA.Oshutter?.Ovalue?.pv || '';
				variableObj.aeshift_value = self.DATA.Oaesinfo?.Ovalue?.pv || '';
				variableObj.afmode = self.DATA.Ofocusinfo?.Oafmode?.pv || '';
				variableObj.facedetection = self.DATA.Ofocusinfo?.Ofacedat?.pv || '';
				variableObj.focusguide = self.DATA.Ofocusinfo?.Oguide?.pv || '';
				variableObj.zoom_speed = self.DATA.Ozoom?.speed || '';
				variableObj.zoom_position = self.DATA.Ozoom?.pos || '';

				self.setVariableValues(variableObj);
			}
		}
		catch(error) {
			self.log('error', 'Error setting variables: ' + error);
		}
	}
}