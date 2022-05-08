# My Dotfiles

**Clone these into your home folder. The commands I mention lower in the README should make what I mean by that clear.**

These are really not set up for use on a laptop, as mine broke, and my parents won't let me install Arch on theirs. I believe the original [eww config I used](https://github.com/Saimoomedits/eww-widgets) was made for a laptop, but it barely worked for me, so it took a few days of fucking around with it to make it work. I left some of the laptop bits in there in case I ever get one, but I've left them commented out in `bar/eww.yuck`. You can re-enable them if you want, but I don't know how well they'll work.

# Installation

## Packages

### Arch Repos
`sudo pacman -S bspwm sxhkd dunst picom polkit-kde-agent redshift xwallpaper deno playerctl pulsemixer`

### AUR
`eww-git` `nerd-fonts-fira-code`

Install those with your favorite AUR helper.

### If you don't use Arch or something else based on it, installing these will obviously be different. As I use Arch, I can't really help with that, as I don't know how other things work.

## Use

In `bspwm/bspwmrc`, update lines 21, 22, and 23 with the actual names of your monitor(s). If you have less than three, remove some of those. If you have more, add more lines like that. To get your monitor names, use `bspc query -M --names`.

Symlink `bspwm` to `~/.config/bspwm`, with `ln -s ~/dotfiles/bspwm ~/.config/bspwm`. Do the same with `rofi`. `ln -s ~/dotfiles/rofi ~/.config/rofi`.

### OR
Assuming you use `paru` as your AUR helper, you can just use the nice little sh script I've included to install everything and move stuff.