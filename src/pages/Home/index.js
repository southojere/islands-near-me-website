import React from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import {
  EyeOutlined,
  CommentOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  MessageOutlined
} from "@ant-design/icons";
import bestFriendIcon from "../../images/bestfriendsicon.png";
import serviceIcon from "../../images/phonechat.png";
import loginIcon from "../../images/callresident.png";
import logoutIcon from "../../images/nookmiles.png";
import aboutIcon from "../../images/islandinfo.png";

import { PageWrapper, MenuTitle, MenuGrid, MenuItem } from "./styles";
import { getUser, clearUser } from "../../helpers/local-storage";

const USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

const menu = {};
menu.AUTH_USER = [
  {
    icon: <img src={bestFriendIcon} alt="People icon"></img>,
    label: "Islands Near Me",
    link: "/islandsnearme",
    backgroundColor: "radial-gradient(#eebd77,#ed8067 );"
  },
  {
    icon: <img src={serviceIcon} alt="Feature requests icon"></img>,
    label: "Feature requests",
    link: "/requests",
    backgroundColor: "#d2de43"
  },
  {
    icon: <img src={aboutIcon} alt="About"></img>,
    label: "About",
    link: "/about",
    backgroundColor: "#907b4f"
  },
  {
    icon: <img src={logoutIcon} alt="Logout icon"></img>,
    label: "Logout",
    backgroundColor: "#8a9af7",
    action: () => {
      clearUser();
      window.location.reload();
    }
  }
];

menu.UNAUTH_USER = [
  {
    icon: <img src={bestFriendIcon} alt="people icon"></img>,
    label: "Islands Near Me",
    link: "/islandsnearme",
    backgroundColor: "radial-gradient(#eebd77,#ed8067 );"
  },
  {
    icon: <img src={serviceIcon} alt="feature requests icon"></img>,
    label: "Feature requests",
    link: "/requests",
    backgroundColor: "#d2de43"
  },
  {
    icon: <img src={aboutIcon} alt="About"></img>,
    label: "About",
    link: "/about",
    backgroundColor: "#907b4f"
  },
  {
    icon: <img src={loginIcon} alt="login icon"></img>,
    label: "Login",
    link: "/login",
    backgroundColor: "#9fd9df"
  }
];

const Home = () => {
  const history = useHistory();
  const [user, setUser] = React.useState();
  const [inFocusMenuItem, setMenuItem] = React.useState("Welcome!");

  React.useState(() => {
    const user = getUser();
    setUser(user);
  }, []);

  const handleMenuItemClick = menuItem => {
    if (menuItem.link) {
      history.push(menuItem.link);
    }
  };
  const handleMenuItemHover = menuItem => {
    setMenuItem(menuItem.label);
  };

  const usersMenu = user ? menu.AUTH_USER : menu.UNAUTH_USER;
  return (
    <PageWrapper>
      <MenuTitle>{inFocusMenuItem}</MenuTitle>
      <br />
      <MenuGrid>
        {usersMenu.map((item, k) => {
          return (
            <MenuItem
              key={`menu-item-${k}`}
              backgroundColor={item.backgroundColor}
              onMouseEnter={() => handleMenuItemHover(item)}
              onClick={() => {
                if (item.action) {
                  item.action();
                  return;
                }
                handleMenuItemClick(item);
              }}
            >
              {item.icon}
            </MenuItem>
          );
        })}
      </MenuGrid>
      <br />
    </PageWrapper>
  );
};

export default Home;
