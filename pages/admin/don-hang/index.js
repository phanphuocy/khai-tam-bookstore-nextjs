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
    .content__status-filters {
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
      padding: ${({ theme }) => `0 ${theme.spacing["6"]}`};
      display: flex;

      .content__status-filters-link {
        margin: ${({ theme }) => `0 ${theme.spacing["4"]}`};
        padding: ${({ theme }) =>
          `${theme.spacing["6"]} ${theme.spacing["2"]}`};
        &:hover,
        &:active {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.green["100"]};
        }
        &.active {
          color: ${({ theme }) => theme.colors.green["100"]};
          border-bottom: ${({ theme }) =>
            `4px solid ${theme.colors.green["200"]}`};
        }
      }
    }

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
    loading ? false : `/api/v1-admin/orders`,
    useAPI.get
  );

  function onRowClick(id) {
    router.push(`/admin/don-hang/${id}`);
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
          <div className="content__status-filters">
            {statuses.map((status) => (
              <Link href={`/admin/don-hang?filterStatus=${status.value}`}>
                <a
                  className={`content__status-filters-link ${
                    query.filterStatus === status.value ? "active" : ""
                  }`}
                >
                  {status.label}
                </a>
              </Link>
            ))}
          </div>
          <table className="content__table table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Trạng Thái</th>
                <th>Ngày Đặt</th>
                <th>Khách Hàng</th>
                <th>Sách (SL)</th>
                <th>Tạm Tính</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.orders.map((order) => (
                  <tr
                    key={order._id}
                    className="table__row"
                    onClick={() => onRowClick(order._id)}
                  >
                    <td className="table__cell-data">
                      {order._id.substring(0, 6) +
                        "..." +
                        order._id.substring(order._id.length - 6)}
                    </td>
                    <td>{order.status}</td>
                    <td className="table__cell-data">
                      {displayRelativeTime(order.dateOrdered)}
                    </td>
                    <td className="table__cell-data">{order.delivery.name}</td>
                    <td className="table__cell-data">{order.items.length}</td>
                    <td className="table__cell-data">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.prices.discountedPrice)}
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
