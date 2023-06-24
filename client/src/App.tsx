import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { DocuSync } from './DocuSync';
import { Community } from './Community';
import { DocViewer } from './DocViewer';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<DocuSync />}/>
          <Route path="/community" element={<Community />}/>
          <Route path="/docs" element={<DocViewer />}/>
        </Routes>
    </Router>
  );
}

export default App;
