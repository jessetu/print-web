import P, { Params } from "./p";
import { Iframe } from './iframe';
const initConfig: Params = {
	id: "print-web",
	title: "print page"
};

function init(params: Params) {
	const config = Object.assign(initConfig, params);
	console.log(config, initConfig)
	return new P(new Iframe(config));
}

if (typeof window !== "undefined") {
  window.p = init;
}

export default init;