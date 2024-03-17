import * as server from '../entries/pages/stack/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stack/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/stack/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.37dLHHYl.js","_app/immutable/chunks/scheduler.XJfXTXc2.js","_app/immutable/chunks/index.GVqG1VGT.js","_app/immutable/chunks/index.CYnBNtWA.js","_app/immutable/chunks/index.bP-k4iGP.js","_app/immutable/chunks/image.GU3ou8IR.js"];
export const stylesheets = [];
export const fonts = [];
