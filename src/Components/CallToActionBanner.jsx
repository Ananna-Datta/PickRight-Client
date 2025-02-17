import { useState } from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  const [hover, setHover] = useState(false);

  return (
    <section
      className="relative bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20 px-6 text-center"
      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn">
          Discover Exciting Queries & Recommendations
        </h2>
        <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Join now and explore new opportunities. Get personalized recommendations that suit your needs.
        </p>
        <Link
          to="/signup"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`${
            hover ? 'bg-teal-600 scale-105' : 'bg-teal-500'
          } transition-all duration-300 ease-in-out text-lg px-8 py-3 rounded-lg font-semibold shadow-lg`}
        >
          Sign Up Now
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-teal-400"></div>
    </section>
  );
};

export default CallToActionBanner;
