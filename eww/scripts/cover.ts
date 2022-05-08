export async function sh(command: string[]) {
  const cmd = Deno.run({
    cmd: command,
    stdout: "piped",
    stderr: "piped",
  });
  return {
    stdout: new TextDecoder().decode(await cmd.output()),
    stderr: new TextDecoder().decode(await cmd.stderrOutput()),
  };
}

if (Deno.args[0] === "run") {
  const artUrl = (
    await sh([
      "/usr/bin/playerctl",
      "--player=spotify",
      "metadata",
      "mpris:artUrl",
    ])
  ).stdout.split("\n")[0];

  let file;

  try {
    file = await Deno.readTextFile("/tmp/.music_cover.txt");
  } catch (err) {
    if (
      err.message ===
      "No such file or directory (os error 2), open '/tmp/.music_cover.txt'"
    ) {
      await Deno.writeTextFile("/tmp/.music_cover.txt", "hi!!!");
      file = await Deno.readTextFile("/tmp/.music_cover.txt");
    }
  }

  // console.log(file);

  if (file === artUrl) {
    // do nothing lol
  } else {
    await Deno.writeTextFile("/tmp/.music_cover.txt", artUrl);
    await sh(["/usr/bin/curl", artUrl, "--output", "/tmp/.music_cover.png"]);
    // update the file and download the new image
  }

  console.log("/tmp/.music_cover.png");
}
