import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './component/firebaseConfig';
import ToDoList from './component/ToDoList';
import Login from './component/Login';
import Register from './component/Register';  // Import the Register component
import './App.css'; 
function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Track if user is registering

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* { {user ? (
      <ToDoList />
      ) : ( }
        <>
          {isRegistering ? (
            <Register />
          ) : (
            <Login />
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'No account? Register here'}
          </button>
        </>
      ) */}
       <ToDoList />
    </div>
  );
}

export default App;
