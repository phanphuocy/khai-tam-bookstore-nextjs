import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faUserFriends,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.div`
  background-color: ${({ theme }) => theme.colors.gray["900"]};

  html, body,p,button,a  {
    color:${({ theme }) => theme.colors.gray["200"]};
    font-family: -apple-system, BlinkMacSystemFont, "Proxima Nova", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";

  .header {
    grid-area: header;
    background-color: ${({ theme }) => theme.colors.green["100"]};
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

    .logo {
      padding: ${({ theme }) => `0 ${theme.spacing[8]}`};

      .logo__logotype {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray["900"]};
      }
    }
  }

  .sidebar {
    grid-area: sidebar;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["4"]}`};

    .linkGroup {
      a {
        color:${({ theme }) => theme.colors.gray["400"]};
        ${({ theme }) => theme.borderRadius["rounded"]};
        display: block;
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["2"]}`};
      }
      a.active,
      a:hover {
        color:${({ theme }) => theme.colors.green["400"]};
        text-decoration: none;
        /* background-color: ${({ theme }) => theme.colors.green["700"]}; */
        background-color: #D4EEE2;
      }
    }
  }

  .main {
    grid-area: main;
    overflow-y: scroll;

    .main__heading {
      display: flex;
      padding:${({ theme }) =>
        `${theme.spacing["8"]} ${theme.spacing["12"]} ${theme.spacing["6"]}`};
      align-items: center;
      width:100%;
      
      .main__heading-title {
        font-family:${({ theme }) => theme.fonts.serif};
        color:${({ theme }) => theme.colors.gray["300"]};
        flex: 20% 1 0;
        
      }

      .main__heading-line {
        flex-shrink: 1;
        height: 2px;
        width:90%;
        background-color:${({ theme }) => theme.colors.border.default};
      }

      
    }

    .main__content {
        padding:${({ theme }) =>
          `${theme.spacing["6"]} ${theme.spacing["12"]} ${theme.spacing["8"]}`};        
    }
  }
`;

const adminTheme = (theme) => ({
  ...theme,
  fonts: {
    serif:
      "-apple-system,BlinkMacSystemFont,'Maitree',Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
    sans:
      "-apple-system,BlinkMacSystemFont,'Proxima Nova',Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
  },
});

const links = [
  { path: "/admin", label: "Trang Chủ", icon: faHome },
  { path: "/admin/don-hang", label: "Đơn Hàng", icon: faShoppingBag },
  { path: "/admin/quan-li-sach", label: "Quản Lí Sách", icon: faBook },
  { path: "/admin/khach-hang", label: "Khách Hàng", icon: faUserFriends },
];

const AdminLayout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={adminTheme}>
      <StyledPage>
        <header className="header">
          <div className="logo">
            <p className="logo__logotype">Khai Tâm Bookstore</p>
          </div>
        </header>
        <aside className="sidebar">
          <ul className="linkGroup">
            {links.map((link) => (
              <li className="linkGroup__item" key={link.path}>
                <Link href={link.path}>
                  <a className={pathname === link.path ? "active" : ""}>
                    <FontAwesomeIcon icon={link.icon} fixedWidth /> {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="main">
          <div className="main__heading">
            <h1 className="main__heading-title">
              {links.filter((link) => link.path === pathname)[0].label}
            </h1>
            <div className="main__heading-line"></div>
          </div>
          <div className="main__content">{children}</div>
        </main>
      </StyledPage>
    </ThemeProvider>
  );
};

export default AdminLayout;
