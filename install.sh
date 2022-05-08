#!/bin/bash

paru -S bspwm sxhkd dunst picom polkit-kde-agent redshift xwallpaper deno playerctl pulsemixer eww-git nerd-fonts-fira-code

mv ~/.config/bspwm ~/.config/bspwm-old
ln -s ~/dotfiles/bspwm ~/.config/bspwm

mv ~/.config/rofi ~/.config/rofi-old
ln -s ~/dotfiles/rofi ~/.config/rofi
