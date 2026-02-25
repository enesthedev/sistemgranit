# AI Agent Operating Manual

> This is the primary operating guide for the agent. The agent reads this file at every session,
> but does NOT re-analyze the project from scratch — it refers to `tasks/project-state.md` instead.

---

## 🧠 Project Memory & Context Persistence

### Session Start Protocol (APPLIED AT EVERY NEW SESSION)

1. **Read `tasks/project-state.md` first** — contains the current project state
2. **Then read `tasks/lessons.md`** — past mistakes and learnings live here
3. **Then read `tasks/todo.md`** — active tasks and progress tracked here
4. **Only if these files don't exist**, analyze the project from scratch and create them

> ⚠️ CRITICAL: Do NOT re-analyze the project every time. Check state files first.
> If state files are current and consistent, start working immediately.

### `tasks/project-state.md` Structure (Auto-created/updated by the agent)

```markdown
# Project State — Auto-generated
> Last updated: [date-time]
> Updated during: [which task triggered the update]

## Tech Stack
- [Framework, language, database, package manager, etc.]

## Architecture Summary
- [Project structure: monorepo/microservice/monolith]
- [Folder structure overview — main directories only]
- [Key patterns: state management, API structure, etc.]

## Active Services & Integrations
- [API endpoints, 3rd party services, DB connections]

## Key Configurations
- [Env variables, build config, deploy target]

## Known Constraints & Technical Debt
- [Known bugs, workarounds, TODOs]

## Dependency Notes
- [Critical packages and their versions]
```

### State Update Rules
- **After every architectural change** → update `project-state.md`
- **New package/service added** → update
- **Configuration changed** → update
- Small bug fixes do NOT require an update
- Always add the date and context at the top of each update

---

## 🔄 Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, **STOP and re-plan immediately** — do not keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy (Keep main context window clean)
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for the relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: **"Would a staff engineer approve this?"**
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — do not over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Do not ask for hand-holding
- Point at logs, errors, failing tests → then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## 📋 Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in with the user before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections
7. **Update State**: Update `tasks/project-state.md` on architectural/structural changes

---

## 📁 Required File Structure

```
tasks/
├── project-state.md    # Project state & context (prevents re-analysis)
├── todo.md             # Active tasks and progress
├── lessons.md          # Learnings and mistake patterns
└── archive/            # Completed task archive (optional)
```

### First-Time Setup (Only if files don't exist)
If the `tasks/` folder or its files don't exist:
1. Analyze the project
2. Create `tasks/project-state.md`
3. Create `tasks/lessons.md` (with empty template)
4. Create `tasks/todo.md` (with empty template)
5. Summarize the analysis to the user

---

## 🏗️ Core Principles

- **Simplicity First**: Make every change as simple as possible. Touch minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what is necessary. Avoid introducing bugs.
- **State Awareness**: Always keep the project state up to date. No unnecessary re-analysis.
- **Incremental Progress**: Break large changes into small, verifiable steps.

---

## 🚫 Anti-Patterns (DO NOT DO THESE)

- ❌ Re-analyze the entire project at the start of every session
- ❌ Ignore state files when they exist
- ❌ Repeat the same mistake without logging it to `lessons.md`
- ❌ Jump straight to code without planning
- ❌ Make major architectural changes without asking the user
- ❌ Say "done" without testing
- ❌ Push hacky solutions and accumulate technical debt
