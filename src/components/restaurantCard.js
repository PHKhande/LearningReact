import { IMG_CDN_URL } from "./constants";

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, avgRating }) => {
  return (
    <div className="card">
      <img src={`${IMG_CDN_URL}` + cloudinaryImageId} />
      <h2>{name}</h2>
      <h2>{cuisines.join(", ")}</h2>
      <h2>{avgRating + " Stars"}</h2>
    </div>
  );
};

export default RestaurantCard;