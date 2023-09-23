import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import './App.css';
import BackgroungImg from './component/background.jsx';

function App() {
  const node1 = "-400"
  const node2 = "40"
  const node3 = "500"

  const [vCardData, setVCardData] = useState('');
  const [activeNode, setActiveNode] = useState(node1);
  const [cardInfo, setCardInfo] = useState('Projects');

  const [cardRelative2NodePosition, setCardRelative2NodePosition] = useState('40px');
  const [triRelative2NodePosition, setTriRelative2NodePosition] = useState('-160px');

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

const setNodeto1 = () => {
  setActiveNode(node1)
  setCardInfo('Projects')
  setCardRelative2NodePosition('40px')
  setTriRelative2NodePosition('-160px')
}

const setNodeto2 = () => {
  setActiveNode(node2)
  setCardInfo('Resume')
  setCardRelative2NodePosition('125px')
  setTriRelative2NodePosition('-123px')
}

const setNodeto3 = () => {
  setActiveNode(node3)
  setCardInfo('Music')
  setCardRelative2NodePosition('210px')
  setTriRelative2NodePosition('-87px')
}

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
      <div className="node-animation">
          <svg height={80} width={300} viewBox='0 0 80 300' preserveAspectRatio="xMidYMid">
            <circle className='Active' cx={activeNode} cy="150" r="40" />
            <circle className='node 1' cx="-400" cy="150" r="80" onClick={setNodeto1}/>
            <circle className='node 2' cx="40" cy="150" r="80" onClick={setNodeto2} />
            <circle className='node 3'cx="500" cy="150" r="80" onClick={setNodeto3} />
            <line x1="130" y1="150" x2="425" y2="150"/>
            <line x1="-315" y1="150" x2="-40" y2="150"/>
          </svg>
        <div className="card-container" style={{position: 'relative', left: `${cardRelative2NodePosition}`, transition:'left 650ms ease-in-out'}}>
          <svg width={25} height={25} style={{position: 'relative', left: `${triRelative2NodePosition}`, transition:'left 650ms ease-in-out'}}>
            <polygon points="12.5,7 0,25 25,25" fill="white" className='triangle'/>
          </svg>
          <div className="box">
            {cardInfo}
            <br/>
            {cardInfo === 'Projects' && <a href='https://tysmith.one/projects' target='_blank' rel='noopener noreferrer'>My Projects</a>}
            {cardInfo === 'Resume' && <a href='https://tysmith.one/resume' target='_blank' rel='noopener noreferrer'>My Resume</a>}
            {cardInfo === 'Music' &&
            <div className='link-stack'>
            <a href='https://music.apple.com/us/artist/atlessc/1385247600' target='_blank' rel='noopener noreferrer'>Apple Music</a>
            <a href='https://www.youtube.com/@atlessc5286' target='_blank' rel='noopener noreferrer'>YouTube</a>
            </div>}
          </div>
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
