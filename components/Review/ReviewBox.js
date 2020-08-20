import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Rating from "./Rating";

const StyledBox = styled.div`
  min-height: 5rem;
  /* border: 1px dashed brown; */

  .overview {
    background-color: ${({ theme }) => theme.colors.neutral["600"]};
    padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["2"]}`};
    .overview__rating {
      display: flex;
      align-items: center;
    }
    .overview__recommend {
    }
  }

  .reviews {
  }
`;

const StyledReview = styled.div`
  padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral["450"]}`};
  p.user {
    margin-bottom: ${({ theme }) => theme.spacing["1"]};
    .username {
      color: ${({ theme }) => theme.colors.green["400"]};
    }
  }
  h4.title {
    margin-bottom: ${({ theme }) => theme.spacing["1"]};
  }
  p.body {
    margin-bottom: ${({ theme }) => theme.spacing["1"]};
  }
`;

const ReviewBox = ({ average, reviews }) => {
  return (
    <StyledBox>
      <div className="box__overview overview">
        <p className="overview__rating">
          <Rating rating={average} />
          <span>
            <small>
              {average ? `${average.toString()}` : "Chưa có cảm nhận nào"}
            </small>
          </span>
          {reviews.length > 0 && (
            <span>
              {" | "}
              {reviews.length} cảm nhận
            </span>
          )}
        </p>
        <p className="overview__recommend"></p>
      </div>
      {reviews && reviews.length > 0 && (
        <div className="box__reviews reviews">
          <div className="reviews__heading"></div>
          <div className="reviews__content">
            {reviews.map((review) => (
              <StyledReview key={review._id}>
                <p className="user">
                  <small className="username">{review.username}</small>
                  <small> đã bình chọn </small>
                  <Rating rating={review.rating} small />
                </p>
                <h4 className="title">{review.title}</h4>
                <p className="body">{review.body}</p>
              </StyledReview>
            ))}
          </div>
        </div>
      )}
    </StyledBox>
  );
};

ReviewBox.defaultProps = {
  average: null,
  scale: {
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
  },
  reviews: [],
  recommend: null,
};

ReviewBox.propTypes = {
  average: PropTypes.number.isRequired,
  scale: PropTypes.shape({
    "1": PropTypes.number.isRequired,
    "2": PropTypes.number.isRequired,
    "3": PropTypes.number.isRequired,
    "4": PropTypes.number.isRequired,
    "5": PropTypes.number.isRequired,
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      userNbReviews: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      createdAt: PropTypes.instanceOf(Date),
    })
  ),
};

export default ReviewBox;
