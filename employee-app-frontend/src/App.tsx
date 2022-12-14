import { Route, Routes } from 'react-router-dom';
import './App.css';
import Addemployee from './components/Addemployee';
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/addemployee' element={<Addemployee/>}/>
        <Route path='/addproject' element={<AddProject/>}/> 
      </Routes>
    </div>
  );
}

export default App;
