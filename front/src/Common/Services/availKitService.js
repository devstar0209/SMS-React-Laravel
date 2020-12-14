import { NConfig, Nurep } from 'nurep-js';

const defaultConfig = new NConfig();
defaultConfig.pubnubPublishKey = 'demo';
defaultConfig.pubnubSubscribeKey = 'demo';
defaultConfig.pubnubAuthKey = 'demo';

export default class AvailKitSingleton {
	static getInstance(config = defaultConfig) {
		if (!AvailKitSingleton.instance) {
			const availKit = new Nurep(config);
			availKit.eventService.addEventListener(availKit.telephonyService);
			availKit.eventService.addEventListener(availKit.annotationService);
			AvailKitSingleton.instance = availKit;
		}
		return AvailKitSingleton.instance;
	}

	static instance = null;
}
