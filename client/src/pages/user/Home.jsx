import { userComponents } from "../../components/components";

const Home = () => {
    return (
        <>
            <userComponents.Hero />
            <userComponents.FeaturedVehicles />
            <userComponents.Banner />
            <userComponents.Testimonial />
            <userComponents.NewsLetter />
        </>
    );
};

export default Home;