import React from "react";
import { useHistory } from "react-router-dom";

// images
import bestFriendIcon from "../../images/bestfriendsicon.png";
import serviceIcon from "../../images/phonechat.png";
import loginIcon from "../../images/callresident.png";
import logoutIcon from "../../images/nookmiles.png";
import aboutIcon from "../../images/islandinfo.png";

import { PageWrapper, MenuTitle, MenuGrid, MenuItem, Badge, MenuItemWrapper } from "./styles";
import { getUser, clearUser } from "../../helpers/local-storage";
import useWindowSize from "../../hooks/useWindow";
import { TABLET_THRESHOLD_WIDTH } from "../../constants";

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
    label: "Requests",
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
    icon: <img src={aboutIcon} alt="About"></img>,
    label: "About",
    link: "/about",
    backgroundColor: "#907b4f"
  },
  {
    icon: <img src={serviceIcon} alt="feature requests icon"></img>,
    label: "Feature requests",
    link: "/requests",
    disabled: true,
    backgroundColor: "#d2de43"
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
  const [width] = useWindowSize();
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
            <MenuItemWrapper>
              <MenuItem
                key={`menu-item-${k}`}
                disabled={item.disabled}
                backgroundColor={item.backgroundColor}
                onMouseEnter={() => handleMenuItemHover(item)}
                onClick={() => {
                  if (item.disabled) return;
                  if (item.action) {
                    item.action();
                    return;
                  }
                  handleMenuItemClick(item);
                }}
              >
                {item.icon}
              </MenuItem>

              {width < TABLET_THRESHOLD_WIDTH && <Badge>{item.label}</Badge>}
            </MenuItemWrapper>
          );
        })}
      </MenuGrid>
      <br />
    </PageWrapper>
  );
};

export default Home;
