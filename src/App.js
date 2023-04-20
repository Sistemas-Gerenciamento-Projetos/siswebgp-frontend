import "./App.css";
import Home from "./routes/home/home.component";
import Painel from "./routes/painel/painel.component";
import Roteiro from "./routes/roteiro/roteiro.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./routes/backlog/backlog.component";
import Login from "./routes/authentication/login/login";
import Register from "./routes/authentication/register/register";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="painel/" element={<Painel />} />
      <Route path="roteiro/" element={<Roteiro />} />
      <Route path="backlog/" element={<Backlog />} />
      <Route path="login/" element={<Login />} />
      <Route path="register/" element={<Register />} />
    </Routes>
  );
};

export default App;