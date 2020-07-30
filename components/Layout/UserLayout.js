import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import Link from "next/link";

import { useAuth } from "../../contexts/userContext";

import Header from "../Navigation/Header";

const StyledLayout = styled.div`
  min-height: 80vh;

  .top-bg {
    ${({ theme }) => theme.backgrounds.top};
    margin-bottom: -10%;
    min-height: 15rem;
    position: relative;
  }

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    position: relative;
    z-index: 50;
  }
  .nav-container {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

    .title {
      border-bottom: 2px solid green;
      padding: ${({ theme }) => theme.spacing["4"]};
      color: white;
    }
    .navigation {
      padding: ${({ theme }) => theme.spacing["4"]};

      ul {
        display: flex;

        li {
          font-weight: 600;
          margin-right: ${({ theme }) => theme.spacing["4"]};
          a {
            color: white;
          }
          a:hover {
            color: white;
            text-decoration-color: ${({ theme }) => theme.colors.green["400"]};
          }
        }
      }
    }
  }

  .content-container {
    ${({ theme }) => theme.borderRadius["rounded-lg"]};

    background-color: white;
    min-height: 15rem;
    padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["8"]}`};

    .heading {
      padding: ${({ theme }) => theme.spacing["4"]};
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
`;

const UserLayout = ({ children }) => {
  const { userState, authenticated, loading } = useAuth();

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <Header />
      <StyledLayout>
        <div className="top-bg"></div>
        <div className="container">
          <div className="nav-container">
            <div className="title">
              <h1>
                {authenticated ? userState.name : <Skeleton width={200} />}
              </h1>
            </div>
            <div className="navigation">
              <ul>
                <li>
                  <Link href="/me">
                    <a>Tủ Sách Của Tôi </a>
                  </Link>
                </li>
                <li>
                  <Link href="/me/sach-muon-mua">
                    <a>Sách Muốn Mua</a>
                  </Link>
                </li>
                <li>
                  <Link href="/me/kiem-tra-don-hang">
                    <a>Kiểm Tra Đơn Hàng</a>
                  </Link>
                </li>
                <li>
                  <Link href="/me/ho-tro">
                    <a>Hỗ Trợ</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-container">{children}</div>
        </div>
      </StyledLayout>
    </>
  );
};

export default UserLayout;
