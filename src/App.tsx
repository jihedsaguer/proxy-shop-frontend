import { useEffect } from 'react';
import Router from './app/router';
import { useAuthStore } from './zud/auth/auth.store';

function App() {
  useEffect(() => {
    useAuthStore.getState().initializeFromStorage();
  }, []);

  return <Router />;
}

export default App;
