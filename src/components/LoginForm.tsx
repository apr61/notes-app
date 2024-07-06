import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { loginInUserWithPassword } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type UserForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [error, setError] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });
  const [isLoading, setLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<UserForm>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const EmailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValues.email.match(EmailRegex) && formValues.password.length >= 6) {
      try {
        setLoading(true);
        await loginInUserWithPassword(formValues.email, formValues.password);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        return;
      } finally {
        setLoading(false);
        setError({ email: null, password: null });
      }
      setFormValues({ email: "", password: "" });
      navigate("/");
    } else if (formValues.email.match(EmailRegex)) {
      setError((prev) => ({ ...prev, email: null }));
    } else if (formValues.password.length >= 6) {
      setError((prev) => ({ ...prev, password: null }));
    }

    if (!formValues.email.match(EmailRegex)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email" }));
    }
    if (formValues.password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be 6 characters",
      }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 border border-gray-600 p-4 rounded-md">
      <h2 className="text-center text-xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <p className="text-red-500">{error.email}</p>
        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <p className="text-red-500">{error.password}</p>
        <Button
          type="submit"
          className="w-full py-2 text-lg"
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
