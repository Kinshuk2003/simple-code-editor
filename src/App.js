// src/App.js
import React from 'react';
import CodeEditor from './CodeEditor';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Simple Code Editor</h1>
      </header>
      <main className="app-main">
        <CodeEditor />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Simple Code Editor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
