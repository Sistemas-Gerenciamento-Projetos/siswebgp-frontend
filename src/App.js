import "./App.css";
import Home from "./routes/home/home.component";
import Painel from "./routes/painel/painel.component";
import Roteiro from "./routes/roteiro/roteiro.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Backlog from "./routes/backlog/backlog.component";
import Login from "./routes/authentication/login/login";
import Register from "./routes/authentication/register/register";
import Projetos from "./routes/projetos/projetos.component";

import { UserDetailsProvider } from "./context/usercontext";

const App = () => {
  return (
    <UserDetailsProvider>
      <Routes>
        <Route index element={<Login />} />
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
