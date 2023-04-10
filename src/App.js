import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import DashBoard from './Pages/Dashboard';
import Home from './Pages/Home';
import Blog from './Pages/Blog';
import BlogDetail from './Pages/BlogDetail';
import Theme from './Components/Theme';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="admin">
          <Route path="" element={<Login/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<DashBoard/>}/>
        </Route>
        <Route path="" element={<Theme/>}>
          <Route path="" element={<Home/>}/>
          <Route path="blog" element={<Blog/>}/>
          <Route path="blog/:id" element={<BlogDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
