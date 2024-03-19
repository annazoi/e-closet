import Button from "../../ui/Button";
import { FaHome } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { authStore } from "../../../store/authStore";
export const Links: any = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <FaHome />,
    onClick: () => {},
  },
  {
    id: 2,
    name: "My Closet",
    path: "/closet",
    icon: <BiCloset />,
    onClick: () => {},
  },
  {
    id: 3,
    name: "Profile",
    path: "/profile",
    icon: <CgProfile />,
    onClick: () => {},
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    icon: <IoMdSettings />,
    onClick: () => {},
  },
  // {
  //   id: 5,
  //   name: "Logout",
  //   path: "/logout",
  //   icon: <IoMdLogOut />,
  //   onClick: () => {},
  // },
];

const MenuContent = () => {
  const navigate = useNavigate();
  const { logOut } = authStore((state) => state);
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {Links.map((link: any) => (
        <Button
          key={link.id}
          name={link.name}
          leftIcon={link.icon}
          color={useColorModeValue("pink.200", "gray.700")}
          onClick={() => {
            navigate(link.path);
          }}
          //   _hover={{
          //     textDecoration: "none",
          //     bg: "primary.400",
          //     color: "white",
          //   }}
        />
      ))}
      <Button
        name="Logout"
        leftIcon={<IoMdLogOut />}
        onClick={() => {
          logOut();
          navigate("/login");
        }}
        color={useColorModeValue("pink.200", "gray.700")}
      />
    </div>
  );
};
export default MenuContent;
