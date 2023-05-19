import "./App.css";
import Painel from "./pages/painel/painel.component";
import Roteiro from "./pages/roteiro/roteiro.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./pages/backlog/backlog.component";
import Projetos from "./pages/projetos/projetos.component";
import Authentication from "./pages/authentication/authentication";

import { useUserDetails } from "./context/usercontext";

const App = () => {
  const [userDetails] = useUserDetails();
  return (
    <Routes>
      <Route index element={<Projetos />} />
      <Route path="projetos/" element={<Projetos />} />
      <Route path="auth/" element={<Authentication />} />
      <Route path="painel/" element={<Painel />} />
      <Route path="roteiro/" element={<Roteiro />} />
      <Route path="backlog/" element={<Backlog />} />
    </Routes>
  );
};

export default App;
