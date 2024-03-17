import * as server from '../entries/pages/tag/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tag/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/tag/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BVjsMbaH.js","_app/immutable/chunks/scheduler.XJfXTXc2.js","_app/immutable/chunks/index.GVqG1VGT.js","_app/immutable/chunks/index.CYnBNtWA.js","_app/immutable/chunks/index.bP-k4iGP.js","_app/immutable/chunks/image.GU3ou8IR.js"];
export const stylesheets = [];
export const fonts = [];
