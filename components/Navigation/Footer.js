import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const StyledFooter = styled.footer`
  border-top: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
  background-color: white;

  .heading-label {
    color: ${({ theme }) => theme.colors.gray["300"]};
    padding: ${({ theme }) => `${theme.spacing["3"]} 0 ${theme.spacing["1"]}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .container {
    ${({ theme }) => theme.maxWidths.maximum};
    padding: ${({ theme: { spacing } }) => `${spacing["8"]} ${spacing["3"]}`};
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-areas: "info . sitemap";

    .container__business-info {
      grid-area: info;
    }
    .container__sitemap {
      grid-area: sitemap;
    }
  }
  .business-info {
    .business-info__logo {
      padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
    }
    .business-info__contacts {
      padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};

      p {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-bottom: ${({ theme }) => theme.spacing["1"]};
      }
      svg {
        color: ${({ theme }) => theme.colors.green["300"]};
        margin-right: ${({ theme }) => theme.spacing["2"]};
      }
    }
  }
  .sitemap {
    display: flex;
    .sitemap__group {
      margin-right: ${({ theme }) => theme.spacing["4"]};

      h6.sitemap__group-heading {
      }
      ul {
        li {
          margin: ${({ theme }) => `${theme.spacing["2"]} 0`};
          a {
            font-size: ${({ theme }) => theme.fontSizes.xm};
          }
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoints.sm} {
    .container {
      grid-template-columns: 100%;
      grid-template-rows: auto auto;
      grid-template-areas:
        "info"
        "sitemap";
      grid-row-gap: ${({ theme }) => theme.spacing["4"]};
    }
    .business-info {
      .business-info__logo {
        img {
          width: 180px;
        }
      }
      .business-info__contacts {
        padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
      }
    }

    .sitemap {
      flex-wrap: wrap;

      .sitemap__group {
        flex-basis: 50%;
        padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
        margin-right: 0;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <div className="container__business-info business-info">
          <div className="business-info__logo">
            <img
              src={require("../../public/brand-images/logo.png")}
              alt="Logotype Khai Tam"
              width="200px"
            />
          </div>
          <div className="business-info__contacts">
            <h6 className="heading-label">Nhà sách Khai Tâm</h6>
            <p>
              <FontAwesomeIcon icon={faMapMarkedAlt} />
              <span>Số 8 Nguyễn Phi Khanh, P. Tân Định, Quận 1, TP. HCM</span>
            </p>
            <p>Hoạt động từ 8h - 21h hàng ngày</p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              <a>028.7301.9778</a>
            </p>
            <h6 className="heading-label">Hỗ trợ đơn hàng online</h6>
            <p>8h - 17h, Thứ Hai đến Thứ Bảy</p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              <a>028.7301.9777</a> - <a>028.7301.6777</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              songdep@khaitam.com
            </p>
          </div>
        </div>
        <nav className="container__sitemap sitemap">
          <div className="sitemap__group">
            <h6 className="sitemap__group-heading heading-label">
              Quy Chế Hoạt Động
            </h6>
            <ul>
              <li>
                <a>Điều khoản sử dụng</a>
              </li>
              <li>
                <a>Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div className="sitemap__group">
            <h6 className="sitemap__group-heading heading-label">
              Vì sao chọn Khai Tâm
            </h6>
            <ul>
              <li>
                <a>Sen búp xin tặng bạn</a>
              </li>
              <li>
                <a>Bao đọc sách hay</a>
              </li>
              <li>
                <a>Yêu cầu đặt sách</a>
              </li>
              <li>
                <a>Dịch vụ tư vấn</a>
              </li>
            </ul>
          </div>
          <div className="sitemap__group">
            <h6 className="sitemap__group-heading heading-label">
              Hỗ trợ mua hàng
            </h6>
            <ul>
              <li>
                <a>Hướng dẫn mua hàng</a>
              </li>
              <li>
                <a>Phương thức thanh toán</a>
              </li>
              <li>
                <a>Phương thức giao hàng</a>
              </li>
              <li>
                <a>Hướng dẫn đổi trả hàng</a>
              </li>
              <li>
                <a>Câu hỏi thường gặp</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </StyledFooter>
  );
};

export default Footer;
