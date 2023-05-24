import { Navigate } from "react-router-dom";
import { useUserDetails } from "../context/usercontext";

export function login({ email, password }) {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [error, setError] = useState(false);

  const req_config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };
  axios
    .post(
      LOGIN_ENDPOINT,
      {
        email: email,
        password: password,
      },
      req_config
    )
    .then((response) => {
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      updateUserDetails(response.data.access, response.data.refresh);
      setLoading(false);
      setError(false);
      return <Navigate replace to="/" />;
    })
    .catch((error) => {
      setLoading(false);
      setError(true);
      return false;
    });
}
