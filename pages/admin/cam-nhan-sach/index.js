import React from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";
import useSWR from "swr";
import useAPI from "../../../hooks/useAPI";
import { useAuth } from "../../../contexts/userContext";
import Link from "next/link";
import { useRouter, Router } from "next/router";
import statuses from "../../../constants/statuses";

const StyledPanel = styled.div`
  ${({ theme }) => theme.borderRadius["rounded"]};
  border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
  background-color: white;
  min-height: 10rem;

  .content {
    table.content__table {
      width: 100%;

      tbody,
      thead {
        tr {
          font-size: 14px;
          padding: ${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["8"]}`};
          border-bottom: ${({ theme }) =>
            `1px solid ${theme.colors.border.default}`};

          td {
            vertical-align: center;
          }
        }
        tr:hover,
        tr:active {
          background-color: ${({ theme }) => theme.colors.gray["800"]};
        }
        td,
        th {
          padding: ${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["8"]}`};
        }
      }
      tbody {
        tr {
          cursor: pointer;
        }
      }
    }
  }
`;

var intlOption = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  dayPeriod: "short",
};

const AdminLoginPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { loading } = useAuth();
  const { data, error, isValidating } = useSWR(
    loading ? false : `/api/v1-admin/review`,
    useAPI.get
  );

  function onRowClick(id) {
    router.push(`/admin/cam-nhan-sach/${id}`);
  }

  function displayRelativeTime(mongoDate) {
    let minuteInMs = 1000 * 60;
    let hourInMs = 1000 * 60 * 60;
    let dayInMs = 1000 * 60 * 60 * 24;
    let offset = new Date() - new Date(mongoDate);
    if (offset / minuteInMs < 60) {
      return new Intl.RelativeTimeFormat("vi-VN", {
        numeric: "always",
        style: "long",
      }).format(Math.ceil(-offset / minuteInMs), "minute");
    } else if (offset / hourInMs < 24) {
      return new Intl.RelativeTimeFormat("vi-VN", {
        numeric: "always",
        style: "long",
      }).format(Math.ceil(-offset / hourInMs), "hour");
    } else if (offset / dayInMs < 3) {
      return (
        new Intl.RelativeTimeFormat("vi-VN", {
          numeric: "auto",
          style: "long",
        }).format(Math.ceil(-offset / dayInMs), "day") +
        ", " +
        new Intl.DateTimeFormat("vi-VN", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          dayPeriod: "short",
        }).format(new Date(mongoDate))
      );
    } else {
      return new Intl.DateTimeFormat("vi-VN", intlOption).format(
        new Date(mongoDate)
      );
    }
  }

  return (
    <AdminLayout>
      <StyledPanel>
        <div className="content">
          <table className="content__table table">
            <thead>
              <tr>
                <th>Sách</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Độc giả</th>
                <th>Thời điểm</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="table__row"
                    onClick={() => onRowClick(review._id)}
                  >
                    <td className="table__cell-data">
                      {review.book.title.substring(0, 55) + "..."}
                    </td>
                    <td>{review.title}</td>
                    <td>{review.rating}</td>
                    <td className="table__cell-data">{review.user.name}</td>
                    <td className="table__cell-data">
                      {displayRelativeTime(review.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </StyledPanel>
    </AdminLayout>
  );
};

export default AdminLoginPage;
