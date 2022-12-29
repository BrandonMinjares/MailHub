import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import SharedContext from './components/SharedContext';

// import Dummy from './components/Dummy';
// import Emoji from './components/Emoji';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [mailbox, setMailbox] = React.useState('inbox');
  const [mail, setMail] = React.useState([]);

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/"
            element={
              <PrivateRoute>
                <SharedContext.Provider value =
                  {{mailbox, setMailbox, mail, setMail}}>
                  <Dashboard />
                </SharedContext.Provider>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
