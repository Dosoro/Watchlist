import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      navigate("/login");
    };

    window.addEventListener("unauthorized", handler);

    return () => window.removeEventListener("unauthorized", handler);
  }, [navigate]);

  return null;
}

export default AuthListener;
