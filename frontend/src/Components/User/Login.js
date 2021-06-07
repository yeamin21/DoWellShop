import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import "./Login.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { queryString } from "query-string";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Login(props) {
  let query = useQuery();
  let h = useHistory();
  let n = query.get("next");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { signin } = useContext(UserContext);
  const handleLogin = (e) => {
    e.preventDefault();
    h.push(n);

    signin(username, password);
  };
  return (
    <div className="login">
      <form method="POST" onSubmit={handleLogin}>
        <label htmlFor="username"> Username </label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password"> Password </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
      <div>
        <Link to="/register">
          <Button> or signup </Button>
        </Link>
      </div>
    </div>
  );
}
