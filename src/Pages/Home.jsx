import AllEquip from "../Components/AllEquip";
import Banner from "../Components/Banner";
import CallToActionBanner from "../Components/CallToActionBanner";
import StatsSection from "../Components/StatsSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllEquip></AllEquip>
            <CallToActionBanner></CallToActionBanner>
            <StatsSection></StatsSection>
        </div>
    );
};


export default Home;