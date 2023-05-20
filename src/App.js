import "./App.css";
import Painel from "./pages/painel/painel.component";
import Roteiro from "./pages/roteiro/roteiro.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./pages/backlog/backlog.component";
import Projetos from "./pages/projetos/projetos.component";
import Authentication from "./pages/authentication/authentication";
import { UserDetailsProvider } from "./context/usercontext";

const App = () => {
  // const [userDetails] = useUserDetails();

  return (
    <UserDetailsProvider>
      <Routes>
        <Route path="auth/" index element={<Authentication />} />
        <Route path="projetos/" index element={<Projetos />} />
        <Route path="painel/" element={<Painel />} />
        <Route path="roteiro/" element={<Roteiro />} />
        <Route path="backlog/" element={<Backlog />} />
      </Routes>
    </UserDetailsProvider>
  );
};

export default App;
