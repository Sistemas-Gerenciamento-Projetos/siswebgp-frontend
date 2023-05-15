import "./App.css";
import Home from "./pages/home/home.component";
import Painel from "./pages/painel/painel.component";
import Roteiro from "./pages/roteiro/roteiro.component";
import Navigation from "./pages/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./pages/backlog/backlog.component";
import Login from "./pages/authentication/login/login";
import Register from "./pages/authentication/register/register";
import Projetos from "./pages/projetos/projetos.component";

import { UserDetailsProvider } from "./context/usercontext";

const App = () => {
  return (
    <UserDetailsProvider>
      <Routes>
        <Route index element={<Projetos />} />
        <Route path="painel/" element={<Painel />} />
        <Route path="roteiro/" element={<Roteiro />} />
        <Route path="backlog/" element={<Backlog />} />
        <Route path="register/" element={<Register />} />
        <Route path="projetos/" element={<Projetos />} />
      </Routes>
    </UserDetailsProvider>
  );
};

export default App;
