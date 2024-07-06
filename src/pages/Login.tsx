import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-lg w-full mx-auto">
      <LoginForm />
      <Link to="/" className="hover:text-blue-500 hover:underline mt-4">
        &lt; Go back
      </Link>
    </div>
  );
};

export default Login;
