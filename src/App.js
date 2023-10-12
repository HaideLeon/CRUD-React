import './App.css';
import Cookies from 'universal-cookie';

import LoginScreen from './screens/LoginScreen';
import NavBar from './screens/NavBar';
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import CrudProducto from './screens/CrudProducto';
import { HashRouter, Route, Routes } from 'react-router-dom';
import '../src/styles/LoginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  const cookies = new Cookies();

  if (!cookies.get('token')) {
    return <LoginScreen />
  }

  return (
    <HashRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<CrudProducto />} />
      <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
