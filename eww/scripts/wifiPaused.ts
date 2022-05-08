import { sh } from "./cover.ts";

console.log(
  (await sh(["curl", "-s", "https://pause.eero.com"])).stdout.includes(
    '<h3 class="subtitle">Your device has been paused.</h3>'
  ) ? "Your wifi is, unfortunately, disabled." : "if your wifi isn't working something's really fucked lol"
);
