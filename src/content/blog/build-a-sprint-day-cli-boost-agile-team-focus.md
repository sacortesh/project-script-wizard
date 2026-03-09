---
title: "Build a Sprint Day CLI: Boost Agile Team Focus"
description: Learn to create a Bash CLI tool that tracks sprint days, adds
  custom reminders for billing and motivation, and inspires a team web dashboard
  for shared agile calendars.
date: 2026-03-08
tags:
  - scripting
  - bash
  - agile
  - scrum
  - sprint
  - cli
draft: false
image: /images/uploads/rsz_69ae3e14b969f.png
---
>**TL;DR**  
Discover how to build a simple Bash CLI tool that calculates the current sprint day, delivers custom team reminders like billing prompts and motivational notes, and even spawned a web version at tellmethesprintday.netlify.app. This guide walks through the code step-by-step, showing how date math powers daily agile focus. Perfect for developers starting their day with calendar, mail, and VPN routines while keeping pendings on track.

# Build a Sprint Day CLI: Boost Agile Team Focus

Imagine starting your workday with a single command that not only opens your calendar, mail, and VPN but also whispers, "Day 7 of 10—plenty of time to crush those pendings, and don't forget to bill those hours!" That's the magic of a custom sprint day CLI tool. Inspired by real-world agile teams, this simple Bash script turns abstract sprint cycles into tangible daily progress markers, fostering motivation and accountability. [linkedin](https://www.linkedin.com/posts/kiran-kannure_agile-scrum-scrummaster-activity-7394946376490582016-o2SW)

Like a friendly coach glancing at the game clock, it reminds you exactly where you stand in the sprint. Teams using similar tools report better focus, as it creates a shared sense of urgency without overwhelming daily standups. [atlassian](https://www.atlassian.com/agile/project-management/sprint-planning-tools)

## Why Sprint Day Tracking Matters in Agile

In agile Scrum, sprints—typically 10 working days—create rhythmic bursts of delivery. But without visibility, days blur, pendings pile up, and motivation dips. A CLI tool solves this by computing the current day instantly. [smartbear](https://smartbear.com/blog/agile-scrum-the-30-day-sprint-and-the-daily-scrum/)

Consider a team of engineers: Sprint starts Wednesday, ends two weeks later. After a week (day 5), the script chimes: "Halfway—bill hours and push to finish!" This isn't just math; it's momentum. Studies show visual progress trackers boost completion rates by 20-30% in iterative workflows, per Atlassian insights on sprint tools. [atlassian](https://www.atlassian.com/agile/project-management/sprint-planning-tools)

Your routine integrates seamlessly: `./morning.sh` launches everything plus the sprint check. No apps, no meetings—just clarity.

## Core Concept: Date Math in Bash

At heart, it's epoch time arithmetic. Convert sprint start to seconds since 1970-01-01, subtract from today, divide by 86,400 (seconds per day). [youtube](https://www.youtube.com/watch?v=Gde5gz6PQHg)

Here's the parable: Think of time as a long road. Epoch gives mileage markers. Distance traveled? Today's marker minus start marker, scaled to days. Bash's `date` command handles the heavy lifting.

Basic formula:
```
today_epoch=$(date +%s)
start_epoch=$(date -d "2026-03-02" +%s)  # Sprint start
days_elapsed=$(( (today_epoch - start_epoch) / 86400 ))
sprint_day=$((days_elapsed + 1))
```

Adjust for weekends? For simplicity, count calendar days first; refine for business days later. [oneuptime](https://oneuptime.com/blog/post/2026-01-24-bash-date-time-operations/view)

## Step-by-Step CLI Implementation

Let's build `./sprint-day.sh`. Make it executable: `chmod +x sprint-day.sh`.

### 1. Configurable Sprint Settings

Start with a config block:
```bash
#!/bin/bash

SPRINT_START="2026-03-02"  # Monday start
SPRINT_DAYS=10
TOTAL_HOURS_EXPECTED=80  # Per team member
```

Hardcode or use env vars: `SPRINT_START=${SPRINT_START:-"2026-03-02"}`. Easy for teams to tweak. [networkworld](https://www.networkworld.com/article/968163/counting-down-the-days-using-bash.html)

### 2. Calculate Current Sprint Day

```bash
today=$(date +%s)
start_epoch=$(date -d "$SPRINT_START" +%s)
elapsed_seconds=$((today - start_epoch))
days_elapsed=$((elapsed_seconds / 86400))
sprint_day=$((days_elapsed + 1))

if [ $sprint_day -gt $SPRINT_DAYS ]; then
    echo "New sprint needed! Last ended Day $SPRINT_DAYS."
    exit 1
fi
```
Robust, handles leap seconds approximately via integer division. [stackoverflow](https://stackoverflow.com/questions/8903239/how-can-i-calculate-time-elapsed-in-a-bash-script)

### 3. Custom Motivational Messages

Tailor by day:
```bash
case $sprint_day in
    1) message="Sprint blast-off! Open calendar, mail, VPN. Let's go!" ;;
    3) message="Day 3: Bill hours now. Pendings won't close themselves." ;;
    7) message="Day 7/10: Momentum building—team, finish strong!" ;;
    9) message="Crunch time! Review pendings, motivate the squad." ;;
    *) message="Day $sprint_day/$SPRINT_DAYS: Steady progress ahead." ;;
esac

echo "🚀 $message"
echo "Time left: $((SPRINT_DAYS - sprint_day + 1)) days."
```
Your team billing nudge? Baked in. Motivational? Customizable array for rotation. [github](https://github.com/MrXgupta/nudge-cli)

### 4. Integrate with Morning Routine

Wrap in `morning.sh`:
```bash
#!/bin/bash
./sprint-day.sh
open_calendar.sh  # Your alias/script
open_mail.sh
open_vpn.sh
```
One command: `morning.sh`. Productivity unlocked.

### 5. Business Days Refinement (Optional)

For precision, skip weekends:
```bash
business_days() {
    local target=$1
    local count=0
    local current=$(date -d "$SPRINT_START" +%Y-%m-%d)
    while [ "$current" != "$target" ]; do
        day_of_week=$(date -d "$current" +%u)  # 1=Mon,7=Sun
        if [ $day_of_week -le 5 ]; then
            ((count++))
        fi
        current=$(date -d "$current +1 day" +%Y-%m-%d)
    done
    echo $count
}
```
Call: `sprint_day=$(business_days "$(date +%Y-%m-%d)")`. Pro-level accuracy. [oneuptime](https://oneuptime.com/blog/post/2026-01-24-bash-date-time-operations/view)

## From CLI to Team Web Dashboard

This initial idea evolved into this website: https://tellmethesprintday.netlify.app became the single source of truth. Teams ignoring calendars? Now a shareable page shows sprint progress visually. Configurable even if your organization has different times

You can build it quick, even with basic HTML and JS.

Netlify deploy: Instant. Add team messages via JSON. No Jira needed—pure, lightweight truth. [sprintcalendar](https://sprintcalendar.com)

CLI is the personal trainer; web is the gym scoreboard. Together, unbeatable.

## Enhancements for Growing Teams

- **Notifications**: Pipe to `notify-send` or `nudge-cli` for desktop pops. [github](https://github.com/MrXgupta/nudge-cli)
- **Velocity Tie-In**: Estimate remaining capacity: "608 hours left" like real Scrum math. [linkedin](https://www.linkedin.com/posts/kiran-kannure_agile-scrum-scrummaster-activity-7394946376490582016-o2SW)
- **Multi-Team**: Env var per repo: `TEAM_SPRINT_START`.

## Real-World Impact and Takeaways

This CLI transformed your mornings and team dynamics. Billing reminders? Check. Motivation? Surging. Pendings closing faster? Absolutely.

Progressive tip: Share the web version company-wide. Democratize agile awareness—no tool overload, just clarity. Start small: Fork this code, tweak for your sprint.

Hope this post sparked an idea. Ready to build? Use AI to vibe code it in your language of preference. Your sprints will thank you. What's gonna be your first custom message?

**Sources & Further Reading**  
- [Atlassian Sprint Tools (2026)](https://www.atlassian.com/agile/project-management/sprint-planning-tools) [atlassian](https://www.atlassian.com/agile/project-management/sprint-planning-tools)
- [Sprint Capacity Calculation (2025)](https://www.linkedin.com/posts/kiran-kannure_agile-scrum-scrummaster-activity-7394946376490582016-o2SW) [linkedin](https://www.linkedin.com/posts/kiran-kannure_agile-scrum-scrummaster-activity-7394946376490582016-o2SW)
- [Bash Date Diff (2025)](https://www.youtube.com/watch?v=Gde5gz6PQHg) [youtube](https://www.youtube.com/watch?v=Gde5gz6PQHg)
- [Bash Time Ops (2026)](https://oneuptime.com/blog/post/2026-01-24-bash-date-time-operations/view) [oneuptime](https://oneuptime.com/blog/post/2026-01-24-bash-date-time-operations/view)
- [Sprint Calendar](https://sprintcalendar.com) [sprintcalendar](https://sprintcalendar.com)
