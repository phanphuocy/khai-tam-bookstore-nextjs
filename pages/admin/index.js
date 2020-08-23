import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import styled from "styled-components";
import Link from "next/link";
import {
  MainAsideLayout,
  MainColumn,
  AsideColumn,
} from "../../components/layout/MainAsideLayout";

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StyledQuickActions = styled.div`
  background-color: white;

  .heading {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    .heading__label {
      padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["4"]}`};
      color: ${({ theme }) => theme.colors.gray["400"]};
      /* text-transform: uppercase;   */
      font-weight: 500;
    }
  }
  .content {
    li.content__quick-action {
      width: 100%;
      display: flex;
      justify-content: stretch;
      a {
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["4"]}`};
        width: 100%;
        display: flex;
        justify-content: space-between;

        &:hover {
          background-color: ${({ theme }) => theme.colors.gray["800"]};
          color: ${({ theme }) => theme.colors.gray["300"]};
          text-decoration: none;
        }

        .content__quick-action-icon {
          color: ${({ theme }) => theme.colors.gray["400"]};
          margin-right: ${({ theme }) => theme.spacing["3"]};
        }
      }
    }
  }
`;

const AdminLoginPage = () => {
  return (
    <AdminLayout>
      <MainAsideLayout>
        <MainColumn></MainColumn>
        <AsideColumn className="side-column column">
          <StyledQuickActions>
            <div className="heading">
              <h6 className="heading__label">Đường Dẫn Nhanh</h6>
            </div>
            <ul className="content">
              <li className="content__quick-action">
                <Link href="/admin/quan-li-sach/tao-moi">
                  <a>
                    <span>
                      <FontAwesomeIcon
                        icon={faBook}
                        className="content__quick-action-icon"
                      />
                      Thêm Sách Mới
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} color="lightgray" />
                  </a>
                </Link>
              </li>
            </ul>
          </StyledQuickActions>
        </AsideColumn>
      </MainAsideLayout>
    </AdminLayout>
  );
};

export default AdminLoginPage;
