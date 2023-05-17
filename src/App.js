import "./App.css";
import Home from "./pages/home/home.component";
import Painel from "./pages/painel/painel.component";
import Roteiro from "./pages/roteiro/roteiro.component";
import Navigation from "./pages/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./pages/backlog/backlog.component";
import Projetos from "./pages/projetos/projetos.component";
import Authentication from "./pages/authentication/authentication";

import { UserDetailsProvider } from "./context/usercontext";

const App = () => {
  return (
    <UserDetailsProvider>
      <Routes>
        <Route index element={<Projetos />} />
        <Route path="painel/" element={<Painel />} />
        <Route path="roteiro/" element={<Roteiro />} />
        <Route path="backlog/" element={<Backlog />} />
        <Route path="projetos/" element={<Projetos />} />
        <Route path="auth/" element={<Authentication />} />
      </Routes>
    </UserDetailsProvider>
  );
};

export default App;
