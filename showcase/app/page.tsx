"use client";

import React from "react";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Todo App Project</h1>
        <p className="subtitle">
          Android Task Manager — Mobile Computing Assignment · Universitas Muhammadiyah Surakarta
        </p>

        <div className="button-group">
          <a
            href="https://github.com/cokecaine/TodoApp/releases/download/v.1.0.0/todolist-app-production.apk"
            className="btn"
          >
            <span className="material-symbols-rounded">download</span>
            Download APK
          </a>
          <a
            href="https://github.com/cokecaine/TodoApp"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <span className="material-symbols-rounded">code</span>
            View on GitHub
          </a>
        </div>
      </header>

      {/* ── 1. Project Goal ───────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">flag</span>
          Project Goal
        </h2>
        <p>
          An Android task manager app built with React Native and Expo as a university Mobile
          Computing assignment at{" "}
          <strong>Universitas Muhammadiyah Surakarta (UMS)</strong>. Developed collaboratively by a
          2-person team using GitFlow — with dedicated feature branches, pull requests, and
          mandatory peer code reviews before every merge.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">5</span>
            <span className="stat-label">Feature Branches</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">8</span>
            <span className="stat-label">Pull Requests</span>
            <span className="stat-sub">3× minimum required</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Team Members</span>
          </div>
        </div>

        <ul className="goal-list">
          <li>
            <span className="material-symbols-rounded">check_circle</span>
            Professional Git &amp; GitHub workflow with SSH authentication
          </li>
          <li>
            <span className="material-symbols-rounded">check_circle</span>
            Structured branching strategy (GitFlow) across the full project lifecycle
          </li>
          <li>
            <span className="material-symbols-rounded">check_circle</span>
            Build and run an Android app using React Native — tested on a real physical device
          </li>
          <li>
            <span className="material-symbols-rounded">check_circle</span>
            Distributed via EAS Build + Development Build — not Expo Go. APK available for download.
          </li>
        </ul>
      </section>

      {/* ── Screenshots ───────────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">photo_library</span>
          Screenshots
        </h2>
        <p>Running on a real Android device.</p>
        <div className="gallery">
          <img src="/booting.png" alt="Booting Screen" className="screenshot" loading="lazy" />
          <img src="/homepage.png" alt="Homepage Screen" className="screenshot" loading="lazy" />
          <img src="/add-todolist.png" alt="Add Todo Screen" className="screenshot" loading="lazy" />
          <img src="/todolist-check.png" alt="Todo Checked Screen" className="screenshot" loading="lazy" />
          <img src="/calendar.png" alt="Calendar Screen" className="screenshot" loading="lazy" />
          <img src="/setting.png" alt="Settings Screen" className="screenshot" loading="lazy" />
        </div>
      </section>

      {/* ── 2. Features ───────────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">featured_play_list</span>
          Features
        </h2>
        <ul className="features">
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">task_alt</span>
            <div className="feature-content">
              <h3>Task Management</h3>
              <p>
                Add, complete, and delete tasks. Completed items automatically sink to the bottom
                of the list so focus stays on what is still pending.
              </p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">event</span>
            <div className="feature-content">
              <h3>Calendar &amp; Due Dates</h3>
              <p>
                Assign due dates via a date picker and view tasks on a monthly calendar grid.
                Overdue items are highlighted in red for immediate visibility.
              </p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">save</span>
            <div className="feature-content">
              <h3>Local Persistence</h3>
              <p>
                All tasks are saved to the device using AsyncStorage. Data survives app restarts
                with no backend or internet connection required.
              </p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">dark_mode</span>
            <div className="feature-content">
              <h3>Dark Mode</h3>
              <p>
                The UI automatically follows the system light/dark mode setting, with a manual
                override toggle available in the Settings screen.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* ── 3. Tech Stack ─────────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">build</span>
          Tech Stack
        </h2>
        <ul className="tech-list">
          <li>
            <span className="material-symbols-rounded">smartphone</span>
            <strong>React Native &amp; Expo</strong> — Core framework and Android build tooling (SDK 54)
          </li>
          <li>
            <span className="material-symbols-rounded">javascript</span>
            <strong>TypeScript</strong> — Type safety across the entire codebase
          </li>
          <li>
            <span className="material-symbols-rounded">route</span>
            <strong>Expo Router</strong> — File-based navigation system
          </li>
          <li>
            <span className="material-symbols-rounded">database</span>
            <strong>AsyncStorage</strong> — Local on-device data persistence
          </li>
          <li>
            <span className="material-symbols-rounded">developer_board</span>
            <strong>EAS (Expo Application Services)</strong> — Build pipeline and APK distribution
          </li>
        </ul>
      </section>

      {/* ── 4. Architecture ───────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">account_tree</span>
          Architecture
        </h2>
        <p>
          The project follows GitFlow with a{" "}
          <code className="inline-code">main</code> branch,{" "}
          <code className="inline-code">develop</code> integration branch, and{" "}
          <strong>5 dedicated feature branches</strong>. Every change enters via Pull Request and
          requires a review approval from another team member before it can be merged.
        </p>
        <div className="arch-tree">
          <div className="arch-branch arch-main">
            <span className="material-symbols-rounded">commit</span>
            <span className="arch-label">main</span>
          </div>
          <div className="arch-branch arch-develop">
            <span className="material-symbols-rounded">commit</span>
            <span className="arch-label">develop</span>
          </div>
          <div className="arch-features">
            <div className="arch-feature-branch">
              <span className="material-symbols-rounded">fork_right</span>
              <span className="arch-label">feature/todo-ui</span>
            </div>
            <div className="arch-feature-branch">
              <span className="material-symbols-rounded">fork_right</span>
              <span className="arch-label">feature/add-task</span>
            </div>
            <div className="arch-feature-branch">
              <span className="material-symbols-rounded">fork_right</span>
              <span className="arch-label">feature/delete-task</span>
            </div>
            <div className="arch-feature-branch">
              <span className="material-symbols-rounded">fork_right</span>
              <span className="arch-label">feature/calendar</span>
            </div>
            <div className="arch-feature-branch">
              <span className="material-symbols-rounded">fork_right</span>
              <span className="arch-label">feature/settings</span>
            </div>
          </div>
        </div>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "var(--text-dim)" }}>
          <strong style={{ color: "var(--text)" }}>8 Pull Requests</strong> merged in total —
          more than double the 3 PR minimum required by the assignment. Additional PRs covered
          calendar logic, settings integration, and conflict resolution between branches.
        </p>
      </section>

      {/* ── 5. Contributions ──────────────────────────── */}
      <section className="section">
        <h2>
          <span className="material-symbols-rounded">group</span>
          Contributions
        </h2>
        <p>Commit history from the project Git log, grouped by author and role.</p>

        <div className="contrib-author">
          <div className="contrib-author-header">
            <span className="material-symbols-rounded contrib-avatar">person</span>
            <div>
              <strong>cokecaine</strong>
              <span className="contrib-role">Affan Ilham Arsyila — Mobile Developer</span>
            </div>
          </div>
          <ul className="commit-list">
            <li><code className="sha">c7eee80</code> feat: update download link to APK for the Todo App</li>
            <li><code className="sha">401d4c1</code> feat: initialize showcase project with Next.js, TypeScript, and Tailwind CSS</li>
            <li><code className="sha">4f3c14d</code> feat: fixing misplaced date in calendar and updating package-lock.json</li>
            <li><code className="sha">0760339</code> feat: update app.json and add app icon assets</li>
            <li><code className="sha">80faa4f</code> feat: implement calendar view with date-based task management and navigation</li>
            <li><code className="sha">58de641</code> docs: update README with project requirements and submission checklist</li>
            <li><code className="sha">869f8cc</code> feat: add due date functionality with date picker for tasks</li>
            <li><code className="sha">4d7af09</code> feat: implement calendar and settings screens with navigation and task management</li>
            <li><code className="sha">cfe4abf</code> refactor: standardize string quotes and update comments for clarity, unify menu icon design</li>
            <li><code className="sha">69e4afc</code> feat: implement task delete feature</li>
            <li><code className="sha">757f404</code> feat: implement task add feature</li>
            <li><code className="sha">741ee7b</code> refactor: remove unused components and reset project structure</li>
            <li><code className="sha">7dccf2c</code> feat: update package configurations and add expo-dev-client dependency</li>
            <li><code className="sha">7310184</code> feat: initialize todo app with essential files and reset script</li>
            <li><code className="sha">0830e48</code> Merge pull request #8 from develop</li>
            <li><code className="sha">c1cb024</code> Merge pull request #7 from develop</li>
          </ul>
        </div>

        <div className="contrib-author">
          <div className="contrib-author-header">
            <span className="material-symbols-rounded contrib-avatar">person</span>
            <div>
              <strong>YolandaAmaliaDhifap</strong>
              <span className="contrib-role">Yolanda Amalia Dhifa — Mobile Developer</span>
            </div>
          </div>
          <ul className="commit-list">
            <li><code className="sha">65100b9</code> Merge branch develop from remote into develop</li>
            <li><code className="sha">5932213</code> feat: update configuration and todo app layout</li>
            <li><code className="sha">0d30814</code> fix: resolve merge conflicts in index.tsx</li>
            <li><code className="sha">5b20ce2</code> fix: resolve merge conflict in index.tsx</li>
            <li><code className="sha">7da2349</code> Merge pull request #6 from feature/settings</li>
            <li><code className="sha">a7c8fb2</code> Merge pull request #5 from feature/calendar</li>
            <li><code className="sha">c29125d</code> fix: refine settings logic and ensure it works with main UI</li>
            <li><code className="sha">2ea2df5</code> fix: resolve bugs and finalize code before switching</li>
            <li><code className="sha">a922d9a</code> feat: finalize merge of all features into develop</li>
            <li><code className="sha">1607a05</code> fix: resolve conflict between UI and Settings logic</li>
            <li><code className="sha">9d1803c</code> fix: resolve conflict and merge todo-ui to develop</li>
            <li><code className="sha">3d97fe0</code> feat: implement calendar logic and date filtering</li>
            <li><code className="sha">b4c1cb7</code> fix: fix misaligned settings layout</li>
            <li><code className="sha">859f748</code> feat: implement settings UI and dark mode toggle</li>
            <li><code className="sha">23f4765</code> Merge todo UI with add and delete task features from develop</li>
            <li><code className="sha">f756d1b</code> Resolve merge conflict from remote todo-ui</li>
            <li><code className="sha">c6b36d1</code> Sync UI branch with latest develop</li>
            <li><code className="sha">654f3e7</code> Resolve conflicts in add and delete task features</li>
            <li><code className="sha">35322fc</code> Merge pull request #3 from feature/delete-task</li>
            <li><code className="sha">6005d2a</code> feat: implement clean UI layout without logic</li>
            <li><code className="sha">02bb161</code> feat: implement base UI/UX layout and navigation</li>
          </ul>
        </div>


      </section>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} cokecaine. All rights reserved.</span>
      </footer>
    </main>
  );
}
