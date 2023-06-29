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

				if (self.DATA.rec == 'rec') {
					return true;
				}

				return false;
			},
		};

		self.setFeedbackDefinitions(feedbacks);
	}
}