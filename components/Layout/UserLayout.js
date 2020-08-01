import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/userContext";

import Header from "../Navigation/Header";

const StyledLayout = styled.div`
  min-height: 80vh;

  .decorated-bg {
    ${({ theme }) => theme.backgrounds.top};
    margin-bottom: -10%;
    min-height: 15rem;
    position: relative;
  }

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    position: relative;
    z-index: 0;

    .container__navigation {
      padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};
    }
  }

  

  .navigation {
    padding: ${({ theme }) => theme.spacing["4"]};
    color: white;
    margin-bottom:${({ theme }) => theme.spacing["2"]};
  
    nav.navigation__tabs {
      padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

      a.navigation__tabs-item {
        
        background-color: rgba(255,255,255,0.5);
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};

        &:hover, &:active, &.active {
          ${({ theme }) => theme.borderRadius.rounded};
          text-decoration:none;
          /* background-color: ${({ theme }) => theme.colors.gray["700"]}; */
          background-color:white;
          color:${({ theme }) => theme.colors.green["400"]};
        }
        &.active {
          border-bottom:${({ theme }) =>
            `2px solid ${theme.colors.green["400"]}`};
        }
      }
    }
  }

  .container__content {
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

const links = [
  { value: "/me", label: "Tủ Sách Của Tôi" },
  { value: "/me/sach-muon-mua", label: "Sách Muốn Mua" },
  { value: "/me/kiem-tra-don-hang", label: "Kiểm Tra Đơn Hàng" },
];

const UserLayout = ({ children }) => {
  const { userState, authenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <Header />
      <StyledLayout>
        <div className="decorated-bg"></div>
        <div className="container">
          <div className="container__navigation navigation">
            <div className="navigation__username">
              <h1>
                {authenticated ? userState.name : <Skeleton width={200} />}
              </h1>
            </div>
            <nav className="navigation__tabs">
              {links.map((link) => (
                <Link href={link.value}>
                  <a
                    className={`navigation__tabs-item ${
                      router.pathname === link.value ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="container__content">{children}</div>
        </div>
      </StyledLayout>
    </>
  );
};

export default UserLayout;
