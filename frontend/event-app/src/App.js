import { useEffect, useState } from 'react';
import ButtonAppBar from './Header';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignInSide from './Login';
import Home from './Home';

export const MAIN_URL = "http://127.0.0.1:8000/event"

var token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))

if (token) {
  token = token.split('=')[1];
}
else {
  token = ""
}



export const axiosInstance = axios.create({
  baseURL: MAIN_URL,
  headers: {
    'Authorization': `Token ${token}`
  },
});

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/auth_check/`)
      .then((res) => {
        console.log(res.data)
        if (res.data[0] === 'authenticated') {
          setIsAuthenticated(true)
        }
        else {
          setIsAuthenticated(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Router>
        <ButtonAppBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="login/" element={<SignInSide isAuthenticated={isAuthenticated} />} />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
