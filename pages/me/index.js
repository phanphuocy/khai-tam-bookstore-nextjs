import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/userContext";
import { useCart } from "../../contexts/cartContext";
import Skeleton from "react-loading-skeleton";
import ProtectRoute from "../../HOC/protectedRoute";

// Import custom components
import Header from "../../components/Navigation/Header";

const StyledPage = styled.main`
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
    z-index: 100;
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
          color: white;
          font-weight: 600;
          margin-right: ${({ theme }) => theme.spacing["4"]};
        }
      }
    }
  }
  .content-container {
    ${({ theme }) => theme.borderRadius["rounded-lg"]};

    background-color: white;
    min-height: 15rem;
    padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};

    .heading {
      padding: ${({ theme }) => theme.spacing["4"]};
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
`;

const MePage = () => {
  const router = useRouter();
  const { userState, authenticated } = useAuth();

  //   useEffect(() => {
  //     if (!authenticated) {
  //       debugger;
  //       router.push("/dang-nhap");
  //     }
  //   }, [authenticated]);

  return (
    <>
      <Header />
      <StyledPage>
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
                <li>Giỏ Hàng</li>
                <li>Sách Muốn Mua</li>
                <li>Kiểm Tra Đơn Hàng</li>
                <li>Hỗ Trợ</li>
              </ul>
            </div>
          </div>
          <div className="content-container">
            <div className="heading">Sắp Xếp Theo</div>
            <div className="content"></div>
          </div>
        </div>
      </StyledPage>
    </>
  );
};

export default ProtectRoute(MePage);
