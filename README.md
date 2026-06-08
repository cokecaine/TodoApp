[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/aeiOAdjr)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23750872&assignment_repo_type=AssignmentRepo)

# React Native Todo App - Assignment Submission

## Project Requirements

### A. Git & SSH Proof

- [ ] Screenshot of SSH connection success
- [ ] <img width="1482" height="762" alt="ssh cokecaine" src="https://github.com/user-attachments/assets/7ce4f7fc-621d-4678-bbd9-c81bd7937f86" />
- [ ] <img width="673" height="147" alt="ssh difa" src="https://github.com/user-attachments/assets/f4454b05-afdc-44db-aa5e-9b29064bf2da" />

- [ ] Git graph output:
  ```bash
  git log --oneline --graph
  ```
  <img width="843" height="603" alt="gambar" src="https://github.com/user-attachments/assets/d88784f7-7651-474f-91ee-4a011cc8f44d" />


### B. GitHub Proof

- [ ] Screenshots of all Pull Requests (minimum 3)
- [ ] Screenshots showing PR reviews from group partner
- [ ] <img width="1919" height="918" alt="pull request" src="https://github.com/user-attachments/assets/dcae85e1-0dcf-4184-a365-84f08b3090b7" />
- [ ] <img width="1919" height="924" alt="Screenshot 2026-05-08 194447" src="https://github.com/user-attachments/assets/206308e5-b570-4657-ac65-60a94d19b7fe" />
- [ ] <img width="1913" height="918" alt="Screenshot 2026-05-08 194520" src="https://github.com/user-attachments/assets/c4b76fca-0088-4315-870d-e5eea0521d2c" />
- [ ] <img width="1915" height="925" alt="Screenshot 2026-05-08 194540" src="https://github.com/user-attachments/assets/e6d00ed4-dc6a-4821-926c-a515ab06fe92" />


### C. Development Build Proof

- [ ] EAS Build success screen
- [ ] <img width="1366" height="665" alt="gambar" src="https://github.com/user-attachments/assets/65bf8b67-0e75-4752-9bc9-69beaeb6e85f" />

- [ ] App installed on device (not via Expo Go)
- [ ] <img width="717" height="1600" alt="ss tampilan todo app" src="https://github.com/user-attachments/assets/0686aabb-4ca9-44f2-9181-237a1f667b93" />

- [ ] App running via Dev Client
- [ ] <img width="629" height="669" alt="gambar" src="https://github.com/user-attachments/assets/eb7fa3d7-2f2d-4199-8a1c-6d359f3a50e8" />


### D. App Screenshots

- [ ] Emulator/Simulator running the app
- [ ] <img width="417" height="963" alt="emulator task" src="https://github.com/user-attachments/assets/b5ba6e83-8a6e-480f-b9ed-8208853e82bf" />

- [ ] Real device running the app
- [ ] <img width="1080" height="2408" alt="tampilan task" src="https://github.com/user-attachments/assets/e2442fdc-c932-4f75-8ebb-39e190ddc03b" />
- [ ] <img width="1080" height="2408" alt="tampilan calender" src="https://github.com/user-attachments/assets/d8ea408e-d44a-4597-bf44-bb00d873a856" />
- [ ] <img width="1080" height="2408" alt="tampilan setting" src="https://github.com/user-attachments/assets/1db55de4-847a-40fc-84a5-81b749b398af" />


### E. Demo Video (Max 3 minutes)

Must demonstrate:

- [ ] Opening the Development Build app
- [ ] Running `npx expo start --dev-client`
- [ ] App execution on device
- [ ] All core features:
  - [ ] Add task
  - [ ] Complete task
  - [ ] Delete task
  - [ ] 

https://github.com/user-attachments/assets/90aa783d-3c52-4f47-9a18-930b459ebbff



---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

### Installation

```bash
cd todo-app
npm install
```

### Development

```bash
npx expo start --dev-client
```

### Building

```bash
eas build --platform android --profile preview
```

---

## Project Structure

```
todo-app/
├── app/               # Main application screens
│   ├── index.tsx      # Home/Todo list screen
│   ├── calendar.tsx   # Calendar view
│   ├── settings.tsx   # Settings screen
│   └── components/    # Reusable components
├── android/           # Native Android code
├── assets/            # App assets and images
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript configuration
└── eas.json          # EAS build configuration
```

---

## Submission Checklist

Use the checklists above to verify all requirements are met before submission.