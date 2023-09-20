import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import './App.css';
import BackgroungImg from './component/background.jsx';

function App() {
  const [vCardData, setVCardData] = useState('');

  useEffect(() => {
    fetch('/ContactInfo.vcf')
      .then(response => response.text())
      .then(data => {
        setVCardData(data);
      });
  }, []);

  const handleAddContact = () => {
    if (window.confirm(`You are about to add Tyler's contact Info,\nWould you like to continue?`)) {
      const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
      saveAs(blob, 'ContactInfo.vcf');
    }
  };

  return (
    <div className='App-container'>
      <div className='Name'>
        <h1>Tyler Smith</h1>
        <h2>React Web Developer</h2>
        <div className='pfp'>
          <img src='/pfp.png' alt='profile' className='pfpimg'/>
          <div className='pfpimg-overlay' />
          <div className='pfpimg-overlay2' />
        </div>
      </div>
      <div className='CTA-Button'>
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
      <BackgroungImg />
    </div>
  );
}

export default App;
