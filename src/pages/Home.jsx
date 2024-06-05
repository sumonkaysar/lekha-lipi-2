import AdventureBlogs from "../components/Home/AdventureBlogs";
import Banner from "../components/Home/Banner";
import DestinationBlogs from "../components/Home/DestinationBlogs";
import PopularPosts from "../components/Home/PopularPosts";
import RecentPosts from "../components/Home/RecentPosts";
import SearchBlogs from "../components/Home/SearchBlogs";

const Home = () => {

    return (
        <div>
            <Banner />
            <div className="w-11/12 max-w-[1440px] mx-auto">
                <SearchBlogs />
                <RecentPosts />
                <AdventureBlogs />
                <DestinationBlogs />
                <PopularPosts />
            </div>
        </div>
    )
};

export default Home