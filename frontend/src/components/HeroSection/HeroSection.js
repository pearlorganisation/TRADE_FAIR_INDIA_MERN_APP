import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeBanner } from "../../features/actions/homeBannerActions";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState({});
  const { isLoading, homeBannerData } = useSelector(
    (state) => state.homeBanner
  );
  useEffect(() => {
    dispatch(fetchHomeBanner());
  }, []);
  useEffect(() => {
    setActiveBanner((prev) => {
      const isActive = homeBannerData?.find((item) => item?.active === true);
      return isActive;
    });
  }, [homeBannerData]);

  return (
    <div className="h-dvh flex justify-center items-center md:pt-10">
      {isLoading ? (
        <div className="bg-slate-200 animate-pulse w-[90%] rounded-2xl mx-auto bg-top h-[80dvh] relative overflow-hidden flex flex-col justify-center items-center gap-12"></div>
      ) : (
        <div className="bg-[#00373E] w-[90%] rounded-tr-3xl rounded-bl-3xl mx-auto bg-top h-[80dvh] relative overflow-hidden flex flex-col justify-center items-center gap-12">
          <svg
            className="absolute top-[-12rem] left-[-15rem] md:top-[-6rem] md:left-[-10rem] rotate-[60deg]"
            width="408"
            height="408"
            viewBox="0 0 1080 1080"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529C646.5823570813251,789.350938855077,458.5978701709415,872.8084498898191,375.5000000000001,848.9428160829436C292.4021298290587,825.0771822760681,235.74513605567677,697.1170570836847,238.9118027223434,599C242.07846938901002,500.88294291631536,312.23530045372377,307.2355329007894,394.49999999999983,260.2404735808356C476.7646995462759,213.24541426088186,644.7499999999998,266.06972301041674,732.4999999999998,317.0296440802775C820.2499999999998,367.9895651501382,920.1668293753347,495.13930687317065,921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529"
              fill="#DFFEC8"
            />
          </svg>
          <svg
            className="absolute top-[-14rem] left-[-10rem] md:top-[-10rem] md:left-[-8rem] rotate-[30deg]"
            width="408"
            height="408"
            viewBox="0 0 1080 1080"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529C646.5823570813251,789.350938855077,458.5978701709415,872.8084498898191,375.5000000000001,848.9428160829436C292.4021298290587,825.0771822760681,235.74513605567677,697.1170570836847,238.9118027223434,599C242.07846938901002,500.88294291631536,312.23530045372377,307.2355329007894,394.49999999999983,260.2404735808356C476.7646995462759,213.24541426088186,644.7499999999998,266.06972301041674,732.4999999999998,317.0296440802775C820.2499999999998,367.9895651501382,920.1668293753347,495.13930687317065,921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529"
              fill="#FBD3B6"
            />
          </svg>

          <svg
            className="absolute rotate-[210deg] bottom-[-10rem] right-[-16rem] md:bottom-[-6rem] md:right-[-10rem]"
            width="408"
            height="408"
            viewBox="0 0 1080 1080"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529C646.5823570813251,789.350938855077,458.5978701709415,872.8084498898191,375.5000000000001,848.9428160829436C292.4021298290587,825.0771822760681,235.74513605567677,697.1170570836847,238.9118027223434,599C242.07846938901002,500.88294291631536,312.23530045372377,307.2355329007894,394.49999999999983,260.2404735808356C476.7646995462759,213.24541426088186,644.7499999999998,266.06972301041674,732.4999999999998,317.0296440802775C820.2499999999998,367.9895651501382,920.1668293753347,495.13930687317065,921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529"
              fill="#FBD3B6"
            />
          </svg>
          <svg
            className="absolute rotate-[210deg] bottom-[-14rem] right-[-12rem] md:bottom-[-12rem] md:right-[-8rem] "
            width="408"
            height="408"
            viewBox="0 0 1080 1080"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529C646.5823570813251,789.350938855077,458.5978701709415,872.8084498898191,375.5000000000001,848.9428160829436C292.4021298290587,825.0771822760681,235.74513605567677,697.1170570836847,238.9118027223434,599C242.07846938901002,500.88294291631536,312.23530045372377,307.2355329007894,394.49999999999983,260.2404735808356C476.7646995462759,213.24541426088186,644.7499999999998,266.06972301041674,732.4999999999998,317.0296440802775C820.2499999999998,367.9895651501382,920.1668293753347,495.13930687317065,921,565.9999999999999C921.8331706246653,636.8606931268291,828.4156904146583,695.0366668274289,737.4990237479917,742.1938028412529"
              fill="#DFFEC8"
            />
          </svg>
          <div className="size-28  md:size-32 rounded-full overflow-hidden border-2 absolute top-3 right-3">
            <img
              className="h-full w-full object-center"
              src="https://s3-alpha-sig.figma.com/img/ec29/30d9/96a3a58415328942b19e383498c68c92?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RYZmvvGt21TiolHxv-Nd-SN5MmEXb81CH99t9G2UU5emj0BdQqv59Qhc~Xa~AMbRMbwUxryp67VytnH~yiGi78PXMg548WdUi9zOjtRiUuOc2S9lTzdZrviA40bGVgMMGZ2jiFPGEhS0FGi-NXQqSWRPMRwrtO3xHkivQ82C598OJ2DzVQJlYcQdmlRlAe6VREoshNsa8m6grwX02D-4eNLyC09~UEGzgyGgWZX5uKg3SO86VWpjYXEHV201s2qhMnDe-A7hNl9aN79qrRiIv6J6DelSY0fOQlYYomUjeonwLQpNgIl8n-xGdYfiITotnKCaLwGt~02~JWxvkFW5GQ__"
              alt=""
            />
          </div>
          <div className="size-28  md:size-32 rounded-full overflow-hidden border-2 absolute bottom-3 left-3">
            <img
              className="h-full w-full object-center"
              src="https://s3-alpha-sig.figma.com/img/00bd/155e/c342848582b1c9ee9b844f8949c18651?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G1SawVFd6aKaT9gmtSBXscl-or37AJC5Q781mK~NgTI-Ny0HDd3P9Ah-~CpIYnp-jn7HHho3qBcbdg1OgZUoWtHFexYx4qbmA2dN6uAkt5reD7d0juJxg-T2AnhOFTpx8XEUqvKeZobC~jIINtkLq3paBPeLyUGOt732HXqLETY9hO-IcN7JGGq0fZCBjv0OwkTBF9Oj4leT3aMzVO1UNcRMjt~R2xAvoqZjxsNdhfejLKB7yI8Xus6mp57w-tezal51uZWtEfjplpw1aF5~-8xnZ-LP48f1QGhGRuLoemDJK8zo~XrP~hNbivIsjYUxSh6OD5K2Chf9RvshdbHPSg__"
              alt=""
            />
          </div>
          <div className="text-fluid_font/none z-50 text-white w-full md:w-[70%] lg:w-[50%] text-center font-medium">
            {/* {activeBanner?.bannerData} */}
            Explore 40+ happening events near you
          </div>
          <button
            onClick={() => {
              // navigate(`${activeBanner?.buttonLink}`);
            }}
            className="bg-[#DFFEC8] hover:ring-[5px] ring-[#DFFEC8]/30 transition-all active:scale-95 px-16 font-medium text-[#00373E] py-3 z-50 rounded-3xl"
            type="button"
          >
            Explore Now
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
