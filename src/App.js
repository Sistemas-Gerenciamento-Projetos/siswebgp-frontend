import './App.css';
import Home from './routes/home/home.component'
import Painel from './routes/painel/painel.component'
import Roteiro from './routes/roteiro/roteiro.component'
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from "react-router-dom";
import Backlog from './routes/backlog/backlog.component';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}> 
        <Route index element={<Home/>}/>     
        <Route path='painel' element={<Painel/>}/>     
        <Route path='roteiro' element= {<Roteiro/>}/>
        <Route path='backlog' element= {<Backlog/>}/>
      </Route>
    </Routes>
  );
}

export default App;
