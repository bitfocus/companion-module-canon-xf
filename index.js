// Canon XF
const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base');
const UpgradeScripts = require('./src/upgrades');

const config = require('./src/config');
const actions = require('./src/actions');
const feedbacks = require('./src/feedbacks');
const variables = require('./src/variables');
const presets = require('./src/presets');

const api = require('./src/api');
const constants = require('./src/constants');

class canonxfInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...api,
			...constants
		})

		this.INTERVAL = null; //used to poll for updates

		this.acid = '';
		this.authlevel = 'full';
		this.seq = 1;

		this.RECORDING = null;

		this.DATA = null;
	}

	async destroy() {
		let self = this;

		if (self.INTERVAL) {
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		if (this.config.verbose) {
			this.log('info', 'Verbose mode enabled. Log entries will contain detailed information.');
		}
	
		this.updateStatus(InstanceStatus.Connecting);

		this.initConnection();
	
		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();
	
		this.checkFeedbacks();
		this.checkVariables();
	}
}

runEntrypoint(canonxfInstance, UpgradeScripts);