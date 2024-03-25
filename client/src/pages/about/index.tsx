import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const About: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        name="Return to Login"
        onClick={() => navigate("/login")}
      ></Button>
    </div>
  );
};
export default About;
