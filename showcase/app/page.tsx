"use client";

import React from "react";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Todo App Project</h1>
        <p className="subtitle">React Native Mobile Computing Assignment</p>
        
        <div className="button-group">
          <a href="https://github.com/cokecaine/TodoApp/releases/download/v.1.0.0/todolist-app-production.apk" className="btn">
            <span className="material-symbols-rounded">download</span>
            Download App
          </a>
          <a href="https://github.com/cokecaine/TodoApp" target="_blank" rel="noreferrer" className="btn btn-outline">
            <span className="material-symbols-rounded">code</span>
            View on GitHub
          </a>
        </div>
      </header>

      <section className="section">
        <h2>
          <span className="material-symbols-rounded">info</span>
          About the project
        </h2>
        <p>
          This is a React Native mobile application I built for a Mobile Computing class at the Apple Academy. 
          The project requirement was to build a cross-platform task manager from scratch using Expo, 
          following a strict GitFlow workflow with team code reviews.
        </p>
        <p>
          Instead of building a quick prototype, I focused on making something that actually feels good to use — adding a calendar view, persistent local storage, due dates, and proper dark mode support.
        </p>
      </section>

      <section className="section">
        <h2>
          <span className="material-symbols-rounded">photo_library</span>
          Screenshots
        </h2>
        <p>
          Here is how the app looks running on a real device.
        </p>
        <div className="gallery">
          <img 
            src="/booting.png" 
            alt="Booting Screen" 
            className="screenshot" 
            loading="lazy"
          />
          <img 
            src="/homepage.png" 
            alt="Homepage Screen" 
            className="screenshot" 
            loading="lazy"
          />
          <img 
            src="/add-todolist.png" 
            alt="Add Todo List Screen" 
            className="screenshot" 
            loading="lazy"
          />
          <img 
            src="/todolist-check.png" 
            alt="Todo List Checked Screen" 
            className="screenshot" 
            loading="lazy"
          />
          <img 
            src="/calendar.png" 
            alt="Calendar Screen" 
            className="screenshot" 
            loading="lazy"
          />
          <img 
            src="/setting.png" 
            alt="Settings Screen" 
            className="screenshot" 
            loading="lazy"
          />
        </div>
      </section>

      <section className="section">
        <h2>
          <span className="material-symbols-rounded">featured_play_list</span>
          Key Features
        </h2>
        <ul className="features">
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">task_alt</span>
            <div className="feature-content">
              <h3>Task Management</h3>
              <p>Add, complete, and delete tasks. Completed items automatically drop to the bottom of the list to keep your focus on pending work.</p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">event</span>
            <div className="feature-content">
              <h3>Calendar & Due Dates</h3>
              <p>Assign due dates to tasks and view them on a monthly calendar grid. Overdue items are highlighted in red.</p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">save</span>
            <div className="feature-content">
              <h3>Local Storage</h3>
              <p>Everything is saved locally to your device using AsyncStorage. Your tasks are waiting exactly where you left them.</p>
            </div>
          </li>
          <li className="feature-item">
            <span className="material-symbols-rounded feature-icon">dark_mode</span>
            <div className="feature-content">
              <h3>Theme Support</h3>
              <p>The UI automatically adapts to your system's light or dark mode setting, with a manual override available in settings.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>
          <span className="material-symbols-rounded">build</span>
          Tech Stack
        </h2>
        <ul className="tech-list">
          <li>
            <span className="material-symbols-rounded">smartphone</span>
            <strong>React Native & Expo</strong> — Core framework and build tooling (SDK 54)
          </li>
          <li>
            <span className="material-symbols-rounded">javascript</span>
            <strong>TypeScript</strong> — For type safety across the entire codebase
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
            <strong>EAS (Expo Application Services)</strong> — Used for building the final development client
          </li>
        </ul>
      </section>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} cokecaine. All rights reserved.</span>
      </footer>
    </main>
  );
}
