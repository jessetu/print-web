import P, { Params } from "./p";
import { Iframe } from './iframe';
const initConfig: Params = {
	id: "print-web",
	iframeId: "print-web-iframe",
	title: "print page"
};

function init(params: Params) {
	const config = Object.assign(initConfig, params);
	return new P(config, new Iframe(config));
}

if (typeof window !== "undefined") {
  window.p = init;
}

export default init;