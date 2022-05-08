import * as ini from "https://deno.land/x/ini@v2.1.0/mod.ts";

const gtkConfig = ini.decode(Deno.readTextFileSync(
  `${Deno.env.get("HOME")}/.config/gtk-3.0/settings.ini`
));

console.log(gtkConfig.Settings['gtk-icon-theme-name'])

console.log('hi yes this is a stupid thing i was working on but never really got around to making')