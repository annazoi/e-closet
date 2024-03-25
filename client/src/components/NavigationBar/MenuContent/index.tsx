import Button from "../../ui/Button";
import { FaHome } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { authStore } from "../../../store/authStore";
import { GrContact } from "react-icons/gr";
import { IoInformationCircleSharp } from "react-icons/io5";
export const isLoggedInLinks: any = [
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
  // {
  //   id: 5,
  //   name: "Logout",
  //   path: "/logout",
  //   icon: <IoMdLogOut />,
  //   onClick: () => {},
  // },
];

const isLogOutLinks: any = [
  {
    id: 1,
    name: "About Us",
    path: "/about",
    icon: <IoInformationCircleSharp size={23} />,
  },
  {
    id: 2,
    name: "Contact",
    path: "/contact",
    icon: <GrContact />,
  },
];

const MenuContent = () => {
  const navigate = useNavigate();
  const { logOut, isLoggedIn } = authStore((state) => state);
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {isLoggedIn
        ? isLoggedInLinks.map((link: any) => (
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
          ))
        : isLogOutLinks.map((link: any) => (
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

      {isLoggedIn && (
        <Button
          name="Logout"
          leftIcon={<IoMdLogOut />}
          onClick={() => {
            logOut();
            navigate("/login");
          }}
          color={useColorModeValue("pink.200", "gray.700")}
        />
      )}
    </div>
  );
};
export default MenuContent;
