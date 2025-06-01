import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = (): null => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      void navigate("/dashboard");
    } else {
      void navigate("/auth");
    }
  }, [user, navigate]);

  return null;
};

export default Login;
