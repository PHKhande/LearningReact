import { useState } from "react";
import { useEffect } from "react";

import { restaurantList } from "./constants";
import RestaurantCard from "./restaurantCard";
import Shimmer from "./shimmer";
import { SWIGGY_RESTAURANT_LINK } from "./constants";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(`${SWIGGY_RESTAURANT_LINK}`);
    const restaurantData = await data.json();

    setRestaurants(
      restaurantData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  const filterData = (txt) => {
    return restaurants.filter((restaurant) =>
      restaurant?.info.name.includes(txt)
    );
  };

  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="seach-container" style={{ border: "2px solid gold" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for restaurants..."
          style={{ padding: "10px" }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          style={{ padding: "10px" }}
          onClick={() => {
            setRestaurants(filterData(searchText));
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard {...restaurant.info} key={restaurant.info.id} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
