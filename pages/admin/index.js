import React from "react";
import styled from "styled-components";
import AdminHeader from "../../components/Navigation/AdminHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faUserFriends,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.div`
  background-color: #f1faf5;

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
        ${({ theme }) => theme.borderRadius["rounded"]};
        display: block;
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["2"]}`};
      }
      a:hover {
        text-decoration: none;
        /* background-color: ${({ theme }) => theme.colors.green["700"]}; */
        background-color: #D4EEE2;
      }
    }
  }

  .main {
    grid-area: main;
  }
`;

const AdminLoginPage = () => {
  return (
    <StyledPage>
      <header className="header">
        <div className="logo">
          <p className="logo__logotype">Khai Tâm Bookstore</p>
        </div>
      </header>
      <aside className="sidebar">
        <ul className="linkGroup">
          <li className="linkGroup__item">
            <a>
              <FontAwesomeIcon icon={faHome} /> Trang Chủ
            </a>
          </li>
          <li className="linkGroup__item">
            <a>
              <FontAwesomeIcon icon={faShoppingBag} /> Đơn Hàng
            </a>
          </li>
          <li className="linkGroup__item">
            <a>
              <FontAwesomeIcon icon={faBook} /> Quản Lí Sách
            </a>
          </li>
          <li className="linkGroup__item">
            <a>
              <FontAwesomeIcon icon={faUserFriends} /> Khách Hàng
            </a>
          </li>
        </ul>
      </aside>
      <main className="main"></main>
    </StyledPage>
  );
};

export default AdminLoginPage;
