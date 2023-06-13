import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './Home.css';

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const type_liste = (event) => {
    const option = event.target.value;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
  
    const text = textarea.value;
    const lines = text.split('\n');
  
    let modifiedText = '';
    if (option === 'add-dash') {
      modifiedText = lines
        .map((line, index) => {
          if (index >= start && index < end) {
            return `- ${line}`;
          } else {
            return line;
          }
        })
        .join('\n');
    } else if (option === 'add-number') {
      modifiedText = lines
        .map((line, index) => {
          if (index >= start && index < end) {
            const lineNumber = index + 1;
            return `${lineNumber}. ${line}`;
          } else {
            return line;
          }
        })
        .join('\n');
    }
  
    const newText = modifiedText;
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + modifiedText.length - text.length);
  };
  
  const [imageLink, setImageLink] = useState('');

  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };
  
  const insertImage = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
  
    const text = textarea.value;
    const modifiedText = `![image](${imageLink})`;
  
    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + modifiedText.length - text.length);
  };  

  const Titre = (event) => {
    const option = event.target.value;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let modifiedText = '';
    switch (option) {
      case 'title':
        modifiedText = `${selectedText}`;
        break;
      case 'title1':
        modifiedText = `# ${selectedText}`;
        break;
      case 'title2':
        modifiedText = `## ${selectedText}`;
        break;
      case 'title3':
        modifiedText = `### ${selectedText}`;
        break;
      case 'title4':
        modifiedText = `#### ${selectedText}`;
        break;
      case 'title5':
        modifiedText = `##### ${selectedText}`;
        break;
      case 'title6':
        modifiedText = `###### ${selectedText}`;
        break;
      default:
        break;
    }

    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, start + modifiedText.length);
  };
  const blod = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const modifiedText = `**${selectedText}**`;

    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + 4); // Ajout de 4 caractères pour compenser l'ajout de "**"
  };

  const bloc_code = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
  
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const modifiedText = `\`${selectedText}\``;
  
    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + 2); // Ajout de 2 caractères pour compenser l'ajout des guillemets inversés
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
  
    const text = textarea.value;
    const selectedText = text.substring(start, end);
  
    const linkURL = prompt("Veuillez saisir l'URL du lien :");
    if (linkURL) {
      const modifiedText = `[${selectedText}](${linkURL})`;
  
      const newText = text.substring(0, start) + modifiedText + text.substring(end);
      setMarkdownText(newText);
      textarea.focus();
      textarea.setSelectionRange(start, start + modifiedText.length);
    }
  };
  
  const italique = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const modifiedText = `*${selectedText}*`;

    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + 2); // Ajout de 2 caractères pour compenser l'ajout de "*"
  };
  
  const Save = () => {
      const element = document.createElement('a');
      const file = new Blob([markdownText], { type: 'text/markdown' });
      element.href = URL.createObjectURL(file);
      element.download = 'myFile.md';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };
    
  const Commenter = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const modifiedText = `>${selectedText}`;

    const newText = text.substring(0, start) + modifiedText + text.substring(end);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(start, end + 2); // Ajout de 2 caractères pour compenser l'ajout de "*"
  };
  return (
    <div>
      <div className='navbar'>
      <h1 className='title'><strong>MARK</strong>EDITOR</h1>
      <button className='save' onClick={Save}><i class="fa-solid fa-floppy-disk"></i></button>
      <select onChange={Titre}>
        <option value="title">Titre</option>
        <option value="title1">Titre 1</option>
        <option value="title2">Titre 2</option>
        <option value="title3">Titre 3</option>
        <option value="title4">Titre 4</option>
        <option value="title5">Titre 5</option>
        <option value="title6">Titre 6</option>
      </select>
      <br />
      <button onClick={blod}><b>B</b></button>
      <button onClick={italique}><i>I</i></button>
      <button onClick={bloc_code}>{'</>'}</button>
      <button onClick={insertLink}><i class="fa-solid fa-link"></i></button>
      <button onClick={Commenter}><i class="fa-solid fa-quote-left"></i></button>
      <select onChange={type_liste}>
        <option value="">liste</option>
        <option value="add-dash">liste a puce</option>
        <option value="add-number">liste ordonné</option>
      </select>
      <input type="text" value={imageLink} onChange={handleImageLinkChange} placeholder="Lien de l'image" />
      <button onClick={insertImage}><i class="fa-solid fa-image"></i></button>
      </div>
      <br />
      <textarea
        ref={textareaRef}
        value={markdownText}
        onChange={handleChange}
      />
      <div>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
    </div>
  );
}

export default MarkdownEditor;