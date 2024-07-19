import StarRatings from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRatings
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
    </>
  );
};

export default Star;
