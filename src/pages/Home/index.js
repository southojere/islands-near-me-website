import React from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import {
  EyeOutlined,
  CommentOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined
} from "@ant-design/icons";

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
    icon: <EyeOutlined style={{ fontSize: "24px" }} />,
    label: "Islands Near Me",
    link: "/islandsnearme"
  },
  {
    icon: <CommentOutlined style={{ fontSize: "24px" }} />,
    label: "Best Friends List",
    link: "/friendslist"
  },
  {
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
    label: "Settings",
    link: "/settings"
  },
  {
    icon: <LogoutOutlined style={{ fontSize: "24px" }} />,
    label: "Logout",
    action: () => {
      clearUser();
      window.location.reload();
    }
  }
];

menu.UNAUTH_USER = [
  {
    icon: <EyeOutlined style={{ fontSize: "24px" }} />,
    label: "Islands Near Me",
    link: "/islandsnearme"
  },
  {
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
    label: "Settings",
    link: "/settings"
  },
  {
    icon: <LoginOutlined style={{ fontSize: "24px" }} />,
    label: "Login",
    link: "/login"
  }
];

const Home = () => {
  const history = useHistory();
  const [user, setUser] = React.useState();
  const [inFocusMenuItem, setMenuItem] = React.useState("");

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
