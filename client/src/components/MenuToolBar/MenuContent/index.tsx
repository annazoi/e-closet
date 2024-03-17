import Button from "../../ui/Input/Button";
import { grid } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";

export const Links: any = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <FaHome />,
  },
  {
    id: 2,
    name: "My Closet",
    path: "/closet",
    icon: <BiCloset />,
  },
  {
    id: 3,
    name: "Profile",
    path: "/profile",
    icon: <CgProfile />,
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    icon: <IoMdSettings />,
  },
  {
    id: 5,
    name: "Logout",
    path: "/logout",
    icon: <IoMdLogOut />,
  },
];

const MenuContent = () => {
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {Links.map((link: any) => (
        <Button
          key={link.id}
          name={link.name}
          leftIcon={link.icon}
          //   _hover={{
          //     textDecoration: "none",
          //     bg: "primary.400",
          //     color: "white",
          //   }}
        />
      ))}
    </div>
  );
};
export default MenuContent;
