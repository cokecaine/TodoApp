# Mobile Computing Assignment #1

## React Native TODO App with GitFlow & Expo Development Build

---

## Objectives

This assignment is designed to ensure students can:

1. Use Git and GitHub professionally with SSH authentication
2. Apply a structured branching strategy (GitFlow)
3. Build a cross-platform mobile application using React Native
4. Run the application on:
   - Emulator/Simulator
   - Real device using Development Build (NOT Expo Go)

---

## Group Assignment

- This is a **group assignment with 2 people**
- Each person must review the other person's Pull Request (PR) before it can be merged

---

## Submission Deadline

**Midnight, Friday 8 May 2026**

---

## Tech Stack (Mandatory)

| Tool | Purpose |
|------|---------|
| Expo | Framework |
| Expo Dev Client | Development build runtime |
| EAS CLI | Build service |
| Git & GitHub (SSH) | Version control |

---

## Project Requirements

### Core Features

| Feature | Description |
|---------|-------------|
| Add task | User can create a new task |
| Display task list | All tasks are shown in a list |
| Mark as completed | User can toggle task completion |
| Delete task | User can remove a task |

### Technical Constraints

- Use functional components and hooks
- State management: `useState` OR `useReducer`

---

## Part 0 — Project Setup

### 1. Clone Your Repository

After accepting the GitHub Classroom assignment, clone your repository using SSH:

```bash
git clone git@github.com:<your-org>/<your-repo>.git
cd <your-repo>
```

### 2. Create the Expo App

Your repository root is reserved for documentation (`ASSIGNMENT.md`, `README.md`). Create the Expo app inside a subdirectory called `todo-app/`:

```bash
npx create-expo-app@latest todo-app
cd todo-app
```

Your repository structure should look like this:

```
<your-repo>/          ← repository root
├── ASSIGNMENT.md
├── README.md
└── todo-app/         ← all Expo project files go here
    ├── app/
    ├── package.json
    └── ...
```

> All subsequent commands in this assignment should be run from inside the `todo-app/` directory.

---

## Part 1 — Git & SSH Setup

### 1. Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 2. Add SSH Key to GitHub

Go to **GitHub → Settings → SSH and GPG Keys** and add your public key.

### 3. Verify Connection

```bash
ssh -T git@github.com
```

> Ensure you see a success message confirming authentication.

---

## Part 2 — GitFlow Workflow

### Rules

- Do **NOT** commit directly to `main`
- All work must go through Pull Requests (PR)

### Branch Structure

```
main
└── develop
     ├── feature/todo-ui
     ├── feature/add-task
     └── feature/delete-task
```

### Workflow

1. Create `develop` branch from `main`
2. Create feature branches: `feature/<feature-name>`
3. Open PR → merge into `develop`
4. Final PR: `develop` → `main`

### PR Requirements

- Minimum **3 Pull Requests**
- Each PR must include:
  - A clear description
  - Summary of changes
  - Review and approval from your group partner

---

## Part 3 — Expo Development Build

> **Expo Go is NOT allowed.**

### 1. Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### 2. Install Dev Client

```bash
npx expo install expo-dev-client
```

### 3. Configure Project

```bash
npx expo prebuild
eas build:configure
```

### 4. Build Development Client

**Android:**

```bash
eas build --profile development --platform android
```

**iOS:**

```bash
eas build --profile development --platform ios
```

### 5. Run the App

```bash
npx expo start --dev-client
```

---

## Part 4 — Device Requirements

You must demonstrate the app running on both:

| Target | Requirement |
|--------|-------------|
| Emulator / Simulator | Android Emulator OR iOS Simulator |
| Real Device | Must use Development Build — Expo Go is not accepted |

---

## Submission Requirements

Update your project README with the following evidence:

### A. Git & SSH Proof

- Screenshot of SSH connection success
- Git graph output:

```bash
git log --oneline --graph
```

### B. GitHub Proof

- Screenshots of all Pull Requests (minimum 3)
- Screenshots showing PR reviews from your group partner

### C. Development Build Proof

1. EAS Build success screen
2. App installed on device (not via Expo Go)
3. App running via Dev Client

### D. App Screenshots

- Emulator/Simulator running the app
- Real device running the app

### E. Demo Video (Max 3 minutes)

Must show:

1. Opening the Development Build app
2. Running `npx expo start --dev-client`
3. App execution on device
4. All core features:
   - Add task
   - Complete task
   - Delete task

---

## Grading Rubric

| Criteria | Weight |
|----------|--------|
| Git & SSH Setup | 15% |
| GitFlow Implementation | 15% |
| Pull Request Quality | 10% |
| App Functionality | 20% |
| Dev Client Build (EAS) | 25% |
| Documentation | 10% |
| UI/UX | 5% |

---

## Important Rules

| Violation | Penalty |
|-----------|---------|
| Using Expo Go | 0 for the deployment section |
| No GitFlow | Score reduction |
| No PRs | Score reduction |
| Fake or incomplete evidence | 0 |

---

## Bonus (Optional)

- Persist data using `AsyncStorage`
- Add filtering (All / Completed / Active)
- Use Zustand or Redux for state management

---

## Notes

This assignment simulates a real-world mobile development workflow:

- Version control discipline
- Branch-based collaboration with peer code review
- Native build pipeline awareness
