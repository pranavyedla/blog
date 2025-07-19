import { assets } from "../assets/assets";
import LatestBlogs from "../components/LatestBlogs";
const Home = () => {
  return (
    <div>
      <div className="my-6 flex justify-center items-center ">
        <img src={assets.contact} alt="" className="w-[80%]" />
      </div>
      <LatestBlogs />
    </div>
  );
};
export default Home;
