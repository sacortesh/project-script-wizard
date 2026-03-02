---
title: "Building CLI Tools with Python and Click"
description: "How to use the Click library to build robust, user-friendly command-line tools in Python — fast."
date: 2026-01-22
tags: ["python", "scripting", "automation"]
draft: false
---

## Why Click?

Python's built-in `argparse` works, but it's verbose. [Click](https://click.palletsprojects.com/) gives you a decorator-based API that's cleaner and more powerful.

```python
import click

@click.command()
@click.option("--name", prompt="Your name", help="Name to greet.")
@click.option("--count", default=1, help="Number of greetings.")
def hello(name, count):
    """Simple program that greets NAME for COUNT times."""
    for _ in range(count):
        click.echo(f"Hello, {name}!")

if __name__ == "__main__":
    hello()
```

Run it:

```bash
$ python hello.py --name Vault-Dweller --count 3
Hello, Vault-Dweller!
Hello, Vault-Dweller!
Hello, Vault-Dweller!
```

## Subcommands

Click makes it trivial to build tools with multiple commands, like `git` or `docker`:

```python
@click.group()
def cli():
    """A multi-command CLI tool."""
    pass

@cli.command()
@click.argument("path")
def scan(path):
    """Scan a directory for large files."""
    import os
    for root, dirs, files in os.walk(path):
        for f in files:
            fp = os.path.join(root, f)
            size = os.path.getsize(fp)
            if size > 100_000_000:  # 100MB
                click.echo(f"[LARGE] {fp} ({size // 1_000_000}MB)")

@cli.command()
@click.argument("filename")
def info(filename):
    """Display file metadata."""
    import os
    stat = os.stat(filename)
    click.echo(f"Size: {stat.st_size} bytes")
    click.echo(f"Modified: {stat.st_mtime}")
```

## Packaging

Once your tool works, add a `setup.py` or `pyproject.toml` entry point and install it system-wide:

```toml
[project.scripts]
mytool = "mytool.cli:cli"
```

Now `mytool scan /var/log` works from anywhere. No `python script.py` needed.

## Takeaway

Click removes the boilerplate from CLI development. If you're writing anything more complex than a one-off script, it's worth the five-minute setup.
