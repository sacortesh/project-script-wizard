---
title: "Linux Process Monitoring One-Liners"
description: "A collection of useful one-liner commands for monitoring and debugging processes on Linux systems."
date: 2026-02-10
tags: ["linux", "scripting", "bash"]
draft: false
---

## Quick Reference

Sometimes you don't need a full monitoring stack. These one-liners get the job done from a terminal session.

### Top Memory Consumers

```bash
ps aux --sort=-%mem | head -20
```

Shows the 20 processes using the most memory, sorted descending.

### Top CPU Consumers

```bash
ps aux --sort=-%cpu | head -20
```

Same idea, but for CPU usage.

### Watch a Specific Process

```bash
watch -n 1 'ps -p <PID> -o pid,ppid,%cpu,%mem,etime,cmd'
```

Refreshes every second. Replace `<PID>` with your target process ID.

### Count Threads per Process

```bash
ps -eLf | awk '{print $2}' | sort | uniq -c | sort -rn | head -10
```

Useful for spotting thread leaks.

### Find Zombie Processes

```bash
ps aux | awk '$8 ~ /Z/ {print}'
```

Zombies are defunct processes waiting for their parent to collect the exit status. A few are normal — hundreds mean something is wrong.

### Open Files by Process

```bash
lsof -p <PID> | wc -l
```

Check if a process is holding too many file descriptors. Pair with `lsof -p <PID> | tail -20` to see what it's holding.

### Network Connections per Process

```bash
ss -tunap | grep <PID>
```

Shows TCP/UDP sockets belonging to a specific process.

## Putting It Together

Chain these into a simple health-check script:

```bash
#!/usr/bin/env bash
echo "=== TOP 5 CPU ==="
ps aux --sort=-%cpu | head -6

echo ""
echo "=== TOP 5 MEMORY ==="
ps aux --sort=-%mem | head -6

echo ""
echo "=== ZOMBIES ==="
ZOMBIES=$(ps aux | awk '$8 ~ /Z/' | wc -l)
echo "Count: $ZOMBIES"

echo ""
echo "=== DISK USAGE ==="
df -h / | tail -1
```

Save it as `health.sh`, make it executable, and run it whenever a server feels sluggish. Simple, no dependencies, works everywhere.
