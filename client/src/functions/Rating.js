import React from "react";
import StarRating from "react-star-ratings";

const ShowAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((rating) => total.push(rating.star));
    let totalReduced = total.reduce((sum, n) => sum + n, 0);
    let result = totalReduced / length;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
            rating={result}
          />{" "}
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};

export default ShowAverage;
