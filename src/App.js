import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';
import './App.css';

import { getUser } from './utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());
  const doesUserExist = user && user.name;
  return (
    <main className="App">
      {' '}
      {doesUserExist ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
