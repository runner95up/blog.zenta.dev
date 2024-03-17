export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DX5RcCA5.js","app":"_app/immutable/entry/app.pIlaTMW2.js","imports":["_app/immutable/entry/start.DX5RcCA5.js","_app/immutable/chunks/entry.BkxuGmfZ.js","_app/immutable/chunks/scheduler.XJfXTXc2.js","_app/immutable/chunks/index.bP-k4iGP.js","_app/immutable/entry/app.pIlaTMW2.js","_app/immutable/chunks/scheduler.XJfXTXc2.js","_app/immutable/chunks/index.GVqG1VGT.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
