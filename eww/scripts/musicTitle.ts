import { sh } from "./cover.ts";

let previousSongName = "";
const maxPosition = 53; // i think?

async function run() {
  const currentSongName = (
    await sh(["playerctl", "--player=spotify", "metadata", "xesam:title"])
  ).stdout.replace("\n", "");
  let songNameLength = 0;
  let currentPosition = 0;

  if (currentSongName !== previousSongName) {
    previousSongName = currentSongName;
  }
}

while (true) {
  console.log("THIS ISNT DONE YET");
  //   await run();
  //   Deno.sleepSync(1 * 1000);
}
