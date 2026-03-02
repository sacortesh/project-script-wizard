---
title: "Automating Your Dotfiles with Bash"
description: "A practical guide to managing and syncing your dotfiles across machines using a simple Bash script and Git."
date: 2025-12-15
tags: ["scripting", "bash", "linux", "automation"]
draft: false
---

## The Problem

Every developer accumulates a collection of dotfiles — `.bashrc`, `.vimrc`, `.gitconfig`, and dozens more. When you set up a new machine or SSH into a fresh server, recreating your environment from scratch is painful.

## The Solution: A Dotfiles Manager

Instead of copying files manually, we can write a small Bash script that symlinks everything into place.

```bash
#!/usr/bin/env bash
set -euo pipefail

DOTFILES_DIR="$HOME/.dotfiles"
BACKUP_DIR="$HOME/.dotfiles_backup/$(date +%Y%m%d_%H%M%S)"

declare -A DOTFILES=(
  [".bashrc"]="bashrc"
  [".vimrc"]="vimrc"
  [".gitconfig"]="gitconfig"
  [".tmux.conf"]="tmux.conf"
)

mkdir -p "$BACKUP_DIR"

for target in "${!DOTFILES[@]}"; do
  source_file="$DOTFILES_DIR/${DOTFILES[$target]}"
  target_file="$HOME/$target"

  if [[ -e "$target_file" && ! -L "$target_file" ]]; then
    echo "[BACKUP] $target_file -> $BACKUP_DIR/"
    mv "$target_file" "$BACKUP_DIR/"
  fi

  echo "[LINK] $source_file -> $target_file"
  ln -sf "$source_file" "$target_file"
done

echo "Done. Backup saved to $BACKUP_DIR"
```

## How It Works

1. **Backup first** — existing files are moved to a timestamped backup directory so nothing is lost.
2. **Symlink** — each dotfile is symlinked from the repo to its expected location in `$HOME`.
3. **Idempotent** — running the script again just re-creates the symlinks without duplicating backups.

## Taking It Further

Combine this with a Git repo and you have a portable, versioned environment. Clone the repo on any machine, run the script, and you're home.

```bash
git clone git@github.com:youruser/dotfiles.git ~/.dotfiles
cd ~/.dotfiles && ./install.sh
```

Next time you tweak your `.vimrc`, commit and push. Every machine stays in sync.
