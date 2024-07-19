import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/Home/NewArrivals";
import BestSellers from "../components/Home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div
        className="p-4 shadow-4 rounded-3 text-danger h1 font-weight-bold text-center"
        style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
      >
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4
        className="text-center p-3 mt-5 mb-5 display-4 shadow-4 rounded-3"
        style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
      >
        New Arrivals
      </h4>

      <NewArrivals />

      <h4
        className="text-center p-3 mt-5 mb-5 display-4 shadow-4 rounded-3"
        style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
      >
        Best Sellers
      </h4>

      <BestSellers />

      <h4
        className="text-center p-3 mt-5 mb-5 display-4 shadow-4 rounded-3"
        style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
      >
        Categories
      </h4>

      <CategoryList />

      <h4
        className="text-center p-3 mt-5 mb-5 display-4 shadow-4 rounded-3"
        style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
      >
        Sub Categories
      </h4>

      <SubList />
      <br />
    </>
  );
};

export default Home;
