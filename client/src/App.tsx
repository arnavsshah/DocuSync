import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { DocuSync } from './pages/DocuSync';
import { Community } from './pages/Community';
import { DocViewer } from './pages/DocViewer';
import { Button } from '@mantine/core';

function App() {
  return (
    <Router>
      <Button component="a" href="/">DocuSync</Button>
      <Button component="a" href="/community">Community</Button>
      <Button component="a" href="/docs">Documentation</Button>

      <Routes>
        <Route path="/" element={<DocuSync />}/>
        <Route path="/community" element={<Community />}/>
        <Route path="/docs" element={<DocViewer />}/>
      </Routes>
    </Router>
  );
}

export default App;
