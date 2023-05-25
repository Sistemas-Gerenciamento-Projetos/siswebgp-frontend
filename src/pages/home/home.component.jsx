import React, { useEffect } from "react";
import Authentication from "../authentication/authentication";
import Projetos from "../projetos/projetos.component";
import { useUserDetails } from "../../context/usercontext";

const Home = () => {
  const [userDetails] = useUserDetails();

  return (
    <div>{userDetails.accessToken ? <Projetos /> : <Authentication />}</div>
  );
};

export default Home;
