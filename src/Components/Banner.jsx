import { Link } from "react-router-dom";
import b3 from "../assets/b3.png";
import b2 from "../assets/b2.png";
import b4 from "../assets/b4.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <div className="relative w-full mt-7">
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {[b3, b2, b4].map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <img className="w-full h-[66vh] object-cover p-10 rounded-lg" src={image} alt={`Slide ${index + 1}`} />
            
            {/* Overlay with text and button */}
            <div className="absolute top-10/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  bg-opacity-50 p-6 rounded-lg">
              <h1 className="text-black text-2xl font-bold mb-4">
                Welcome to PickRight – where smart choices lead to the best results.  
                Discover solutions tailored just for you, all in one place!
              </h1>
              <Link to="/addEquip">
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md">
                  Add Query
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
