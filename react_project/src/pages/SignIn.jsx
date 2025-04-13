// import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
const SignIn = () => {
  const { auth } = useAuth();

  return (
    <div>
      SignIn
      <div>{auth.isAuthenticated ? "yes" : "no"}</div>
      <div>{auth.loading ? "yes" : "no"}</div>
    </div>
  );
};

/*Hade kvar dessa (Clients.jsx, Members.jsx) ifall jag skulle ge mig på VG, men insåg rätt snabbt att det var lite(mycket) för svårt för mig*/
export default SignIn;
