import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { DocuSync } from './pages/DocuSync';
import { Community } from './pages/Community';
import { DocViewer } from './pages/DocViewer';
import { DebugDirectory } from './pages/DebugDirectory';
import { GmailHelp } from './pages/GmailHelp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DebugDirectory />}/>
        <Route path="/gmail" element={<GmailHelp />}/>
        <Route path="/docusync" element={<DocuSync />}/>
        {/* <Route path="/community" element={<Community />}/>
        <Route path="/docs" element={<DocViewer />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
