import React from "react";
import styled from "styled-components";

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const StyledRating = styled.span`
  display: inline-flex;
`;

const Rating = ({ rating, small }) => {
  if (rating < 0) {
    rating = 0;
  } else if (rating > 5) {
    rating = 5;
  }

  let ratingStars = [false, false, false, false, false];

  if (!rating) {
    return (
      <StyledRating>
        {ratingStars.map((star, index) => (
          <FontAwesomeIcon
            icon={faStar}
            color="#eee"
            key={index}
            size={small ? "xs" : "lg"}
          />
        ))}
      </StyledRating>
    );
  }

  ratingStars = ratingStars.map((star, index) => {
    if (index + 1 <= rating) {
      return true;
    } else return false;
  });

  return (
    <StyledRating>
      {ratingStars.map((bool, index) => (
        <FontAwesomeIcon
          icon={faStar}
          color={bool ? "orange" : "lightgray"}
          key={index}
          size={small ? "xs" : "lg"}
        />
      ))}
    </StyledRating>
  );
};

export default Rating;
