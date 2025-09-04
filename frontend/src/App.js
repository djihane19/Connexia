import './App.css';
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import UserProfile from './routes/user_profile';
import Login from './routes/Login';
import Layout from './components/layout';
import Register from './routes/Register';

import { AuthProvider } from './contexts/useAuth';
import PrivateRoute from './components/private_route';
import CreatePost from './routes/create_post';


function App() {
  return (  
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
          <Route  element={<Layout><PrivateRoute><UserProfile/></PrivateRoute></Layout> } path='/:username'   />
          <Route  element={<Layout><PrivateRoute><CreatePost/></PrivateRoute></Layout> } path='/create/post'   />
          <Route  element={<Layout> <Login/> </Layout> } path='/login'   />
          <Route  element={<Layout> <Register/> </Layout> } path='/register'   />
     
 
        </Routes>
        </AuthProvider>
      </Router>

    </ChakraProvider>
    
  );
}

export default App;
