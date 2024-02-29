const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		let self = this;

		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to Canon cameras with the built-in Web Browser Remote and allow you to control parameters and view feedbacks.'
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Camera Model',
				width: 12,
				default: 'XF705',
				choices: [
					{ id: 'XF405', label: 'XF405' },
					{ id: 'XF705', label: 'XF705' },
					{ id: 'C100', label: 'C100 MK2' },
					{ id: 'other', label: 'Other' }
				]
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 12,
				regex: Regex.IP,
				default: ''
			},
			{
				type: 'static-text',
				id: 'line1',
				label: '',
				width: 12,
				value: '<hr />'
			},
			{
				type: 'static-text',
				id: 'line2-xf',
				label: '',
				width: 12,
				value: 'The XF405 and XF705 requires a username/password to be sent when the login session to be initiated.',
				isVisible: (config) => config.model == 'XF405' || config.model == 'XF705' || config.model == undefined
			},
			{
				type: 'static-text',
				id: 'line2-c100',
				label: '',
				width: 12,
				value: 'The C100 MK2 does not require a username/password to be sent but does require the login session to be initiated. This will be done automatically.',
				isVisible: (config) => config.model == 'C100'
			},
			{
				type: 'checkbox',
				id: 'initiateLogin',
				label: 'Initiate Login on Connect',
				width: 12,
				default: false,
				isVisible: (config) => config.model == 'other'
			},
			{
				type: 'checkbox',
				id: 'useCredentials',
				label: 'Use Credentials with Login',
				width: 4,
				default: false,
				isVisible: (config) => config.initiateLogin == true
			},
			{
				type: 'textinput',
				id: 'username',
				label: 'Username',
				width: 4,
				default: 'Full',
				isVisible: (config) => config.useCredentials == true || (config.model == 'XF405' || config.model == 'XF705')
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 4,
				default: '12345678',
				isVisible: (config) => config.useCredentials == true || (config.model == 'XF405' || config.model == 'XF705')
			},
			{
				type: 'static-text',
				id: 'line3',
				label: '',
				width: 12,
				value: '<hr />'
			},
			{
				type: 'static-text',
				id: 'info2',
				label: 'Verbose Logging',
				width: 12,
				value: 'Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.'
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			},
		]
	}
}