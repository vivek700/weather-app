"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoc, setIsLoc] = useState({
    long: 0,
    lati: 0,
    error_message: "",
  });

  const router = useRouter();

  function handleGetLocation() {
    try {
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setIsLoc((prev) => ({ ...prev, long: longitude, lati: latitude }));
      };
      const handleError = ({ message }: GeolocationPositionError) => {
        setIsLoc((prev) => ({ ...prev, error_message: message }));
      };
      navigator.geolocation.getCurrentPosition(success, handleError);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  function handleLocation() {
    const { long, lati, error_message } = isLoc;
    if (!long && !lati && !error_message) {
      handleGetLocation();
    } else {
      const query =
        long && lati ? `long=${long}&lati=${lati}` : `message=${error_message}`;
      router.push(`/weather?${query}`);
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-black   bg-dot-white/[0.2]  relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <button
          type="button"
          onClick={handleLocation}
          className="mb-4 space-x-2 text-white font-semibold hover:scale-110 transition-all duration-300 ease-in-out bg-cyan-500 px-5 py-3 rounded-full hover:text-cyan-500 hover:bg-black shadow-lg shadow-cyan-500/50 focus:outline-none focus:ring focus:ring-cyan-300"
        >
          <p>Get Started</p>
        </button>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 ">
          AtmoSphere
        </p>
      </div>
    </>
  );
}

// const LocationLogo = () => {
//   return (
//     <svg
//       width="25"
//       height="25"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 25 25"
//       fill="currentColor"
//     >
//       <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
//     </svg>
//   );
// };
