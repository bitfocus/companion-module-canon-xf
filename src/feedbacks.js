const { combineRgb } = require('@companion-module/base');

module.exports = {
	initFeedbacks: function () {
		let self = this;
		let feedbacks = {};

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		feedbacks.rec = {
			type: 'boolean',
			name: 'Camera is Recording',
			description: 'Show feedback for Recording State',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			options: [],
			callback: (event) => {
				let opt = event.options

				if (self.DATA.rec.toString().toLowerCase() == 'rec') {
					return true;
				}

				return false;
			},
		};


		feedbacks.manualexposure = {
			type: 'boolean',
			name: 'Full Manual Exposure',
			description: 'Show feedback for Manual exposure mode',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			options: [],
			callback: (event) => {
				let opt = event.options

				if (self.DATA?.Orecmode?.pv.toString().toLowerCase() == 'manual') {
					return true;
				}
				return false;
			},
		};


		feedbacks.tvexposure = {
			type: 'boolean',
			name: 'TV Exposure',
			description: 'Show feedback for TV exposure mode',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			options: [],
			callback: (event) => {
				let opt = event.options

				if (self.DATA?.Orecmode?.pv.toString().toLowerCase() == 'tv') {
					return true;
				}
				return false;
			},
		};

		feedbacks.autofocus = {
			type: 'boolean',
			name: 'AF On',
			description: 'Show feedback for Autofocus',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			options: [],
			callback: (event) => {
				let opt = event.options

				if (self.DATA?.Ofocusinfo?.Oafmode?.pv.toString().toLowerCase() == 'continuous') {
					return true;
				}
				return false;
			},
		};


		feedbacks.manualfocus = {
			type: 'boolean',
			name: 'AF Off',
			description: 'Show feedback for Autofocus',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			options: [],
			callback: (event) => {
				let opt = event.options

				if (self.DATA?.Ofocusinfo?.Oafmode?.pv.toString().toLowerCase() == 'off') {
					return true;
				}
				return false;
			},
		};


		self.setFeedbackDefinitions(feedbacks);
	}
}