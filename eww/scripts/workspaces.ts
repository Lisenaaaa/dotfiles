/*
  this could be way better, i discovered `bspc query -T` when I had already basically made the whole thing
*/

import { sh } from "./cover.ts";

const focusedWorkspace = await getFocusedWorkspace();
const focusedMonitor = await getFocusedMonitor();

async function getFocusedWorkspace() {
  const fw = (
    await sh(["bspc", "query", "-D", "-d", "focused", "--names"])
  ).stdout.split("\n");
  fw.pop();
  return fw[0];
}

async function getFocusedMonitor() {
  const fm = (
    await sh(["bspc", "query", "-M", "-m", "focused", "--names"])
  ).stdout.split("\n");
  fm.pop();
  return fm[0];
}

async function getMonitorNames() {
  const mn = (await sh(["bspc", "query", "-M", "--names"])).stdout.split("\n");
  mn.pop();
  return mn;
}

async function getMonitorWorkspaces(monitor: string) {
  const bspcOutput = await JSON.parse(
    (
      await sh(["bspc", "query", "-T", "-m", monitor])
    ).stdout
  );

  const activeWorkspaces = [];
  for (const desktop of bspcOutput.desktops) {
    activeWorkspaces.push(desktop.name);
  }

  return activeWorkspaces;
}

async function getWorkspaceInformation(monitor: string, workspace: string) {
  const bspcOutput = await JSON.parse(
    (
      await sh(["bspc", "query", "-T", "-m", monitor])
    ).stdout
  );

  return bspcOutput.desktops.find(
    (w: { name: string }) => w.name === workspace
  );
}

class yuck {
  static async getWorkspaceStatus(
    monitor: string,
    workspace: string
  ): Promise<"focused" | "unoccupied" | "occupied"> {
    if (monitor === focusedMonitor && workspace === focusedWorkspace) {
      return "focused";
    }

    if ((await getWorkspaceInformation(monitor, workspace)).root === null) {
      return "unoccupied";
    } else {
      return "occupied";
    }
  }

  static async generateButton(monitor: string, name: string) {
    const ws = await this.getWorkspaceStatus(monitor, name);
    return `(button :onclick "bspc desktop -f ${
      (await getWorkspaceInformation(monitor, name)).id
    }" :class "${ws}Ws" "${WorkspaceIcons[ws]}" )`;
  }


  static async generate() {
    const buttons = [];
    for (const monitor of await getMonitorNames()) {
      for (const workspace of await getMonitorWorkspaces(monitor)) {
        buttons.push(await this.generateButton(monitor, workspace));
      }
      if (monitor !== (await getMonitorNames()).at(-1)) {
        buttons.push('(label :class "separ" :text "|")');
      }
    }

    return `(box :class "works" :orientation "h" :spacing 5 :space-evenly "false" ${buttons.join(
      " "
    )})`;
  }
}
enum WorkspaceIcons {
  focused = "",
  occupied = "",
  unoccupied = "",
}

console.log(await yuck.generate());