import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { signin } = useContext(UserContext);
  const handleLogin = (e) => {
    e.preventDefault();
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
