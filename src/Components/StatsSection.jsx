import { useEffect, useState } from 'react';

const StatsSection = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    let start = 0;
    const end = 1500; // Example counter value
    const duration = 2;
    const increment = end / (duration * 1000);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCounter(end);
      } else {
        setCounter(Math.floor(start));
      }
    }, 1);
  };

  useEffect(() => {
    incrementCounter();
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">
          Why Join Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="stats bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-teal-500 mb-4">1500+</h3>
            <p className="text-lg text-gray-600">Queries Answered</p>
          </div>
          <div className="stats bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-teal-500 mb-4">{counter}</h3>
            <p className="text-lg text-gray-600">Happy Users</p>
          </div>
          <div className="stats bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-teal-500 mb-4">95%</h3>
            <p className="text-lg text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
