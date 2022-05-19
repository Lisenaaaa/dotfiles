import { sh } from "./cover.ts";

const output = await sh(["echo", "hi"]);

console.log(sh);
