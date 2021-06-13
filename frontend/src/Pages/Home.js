import { MidCarousel } from "../Components/Home/Carousel";
import { FeaturedItems } from "../Components/Home/Featured";
import { MostViewedItems } from "../Components/Home/MostViewed";
import { RecentlyAddedItems } from "../Components/Home/RecentlyAdded";
import "./Home.scss";
export default function Home() {
  return (
    <div className="main-home">
      <MidCarousel></MidCarousel>
      <FeaturedItems></FeaturedItems>
      <RecentlyAddedItems></RecentlyAddedItems>
      <MostViewedItems></MostViewedItems>
    </div>
  );
}
