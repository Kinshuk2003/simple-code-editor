// src/CodeEditor.js
import React, { useState, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import './CodeEditor.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CodeEditor = () => {
  const [code, setCode] = useState(`import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
`);
  const editorRef = useRef(null);

  const handleSaveTemplate = () => {
    localStorage.setItem('savedCodeTemplate', code);
    alert('Code template saved!');
  };

  const handleDownloadPDF = async () => {
    const element = editorRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      logging: true,
      useCORS: true,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('code-template.pdf');
  };

  return (
    <div className="code-editor-container">
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.javascript, 'javascript')}
        padding={20}
        ref={editorRef}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#282c34',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          minHeight: '300px',
        }}
      />
      <div className="button-container">
        <button onClick={handleSaveTemplate}>Save Template</button>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
};

export default CodeEditor;
