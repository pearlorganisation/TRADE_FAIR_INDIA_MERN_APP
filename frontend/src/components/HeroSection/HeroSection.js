import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeBanner } from "../../features/actions/homeBannerActions";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [banner, setBanner] = useState();
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

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    if (isBigScreen) {
      console.log("isBigScreen::", isBigScreen);
      console.log("activeBanner?.banner::", activeBanner?.banner);
      setBanner(activeBanner?.banner);
    } else {
      console.log("isTabletOrMobile::", isTabletOrMobile);
      console.log("activeBanner?.mobileBanner::", activeBanner?.mobileBanner);

      setBanner(activeBanner?.mobileBanner);
    }
  }, [isBigScreen, isTabletOrMobile, activeBanner]);
  useEffect(() => {
    console.log("banner::", banner);
  }, [banner]);

  return (
    <div className="h-dvh flex justify-center items-center pt-32">
      {isLoading ? (
        <div className="bg-slate-200 animate-pulse w-[90%] rounded-2xl mx-auto bg-top h-[80dvh] relative overflow-hidden flex flex-col justify-center items-center gap-12"></div>
      ) : (
        <div className=" w-[1710px] rounded-2xl mx-auto bg-top h-[80dvh] relative overflow-hidden flex flex-col justify-center items-center gap-12">
          <div className="text-fluid_font/none z-10 text-white w-full md:w-[70%] lg:w-[50%] text-center font-medium">
            {activeBanner?.bannerData}
            {/* Explore 40+ happening events near you */}
          </div>
          <a
            target="_blank"
            href={`${activeBanner?.buttonLink}`}
            className="bg-[#DFFEC8] hover:ring-[5px] ring-[#DFFEC8]/30 transition-all active:scale-95 px-16 font-medium text-[#00373E] py-3 z-50 rounded-3xl"
            type="button"
          >
            Explore Now
          </a>

          {/* <img
            sizes="(min-width: 768px) 100vw, (max-width: 814px) min(100%, 774px), (max-height: 756px) min(100%, 774px), (min-aspect-ratio: 5184/3888) calc((calc(100vh - 175px)) * 1.33333), calc(100vw - 40px)"
            srcset="
       https://res.cloudinary.com/dnixhctcf/image/upload/w_320,h_180,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 320w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_640,h_360,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 640w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_768,h_432,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 768w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_1024,h_576,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1024w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_1280,h_720,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1280w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_1920,h_1080,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1920w,
       https://res.cloudinary.com/dnixhctcf/image/upload/w_2560,h_1440,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 2560w
     "
            src="https://res.cloudinary.com/dnixhctcf/image/upload/w_2560,h_1440,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg"
            alt="a couple of old tvs sitting in a window"
            className="tB6UZ a5VGX absolute "
            style={{ aspectRatio: "5184 / 3888" }}
          /> */}

          <img
            src={banner}
            alt="a couple of old tvs sitting in a window"
            className="absolute"
            style={{ aspectRatio: "5184 / 3888" }}
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;

{
  /* <img
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        srcset="
    https://res.cloudinary.com/dnixhctcf/image/upload/w_320,h_180,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 320w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_640,h_360,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 640w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_768,h_432,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 768w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_1024,h_576,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1024w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_1280,h_720,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1280w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_1920,h_1080,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 1920w,
    https://res.cloudinary.com/dnixhctcf/image/upload/w_2560,h_1440,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg 2560w
  "
        src="https://res.cloudinary.com/dnixhctcf/image/upload/w_2560,h_1440,c_fill,dpr_auto/v1705394505/kzuhyhxbovd0cujx8vnm.jpg"
        alt="Description of your image"
        className="h-auto w-auto"
      /> */
}
{
  /* <img
            sizes="(min-width: 768px) 100vw, (max-width: 814px) min(100%, 774px), (max-height: 756px) min(100%, 774px), (min-aspect-ratio: 5184/3888) calc((calc(100vh - 175px)) * 1.33333), calc(100vw - 40px)"
            srcSet="https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 774w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1074w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1374w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1548w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1674w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1974w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2148w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2274w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2574w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2748w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2874w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3174w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3348w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3474w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3774w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=3948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3948w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=4074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4074w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=4374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4374w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=4548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4548w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=4674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4674w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=4974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4974w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=5148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 5148w, https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=5184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 5184w"
            src="https://images.unsplash.com/photo-1705951439619-28c0fbbd0ab0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="a couple of old tvs sitting in a window"
            className="tB6UZ a5VGX absolute "
            style={{ aspectRatio: "5184 / 3888" }}
          /> */
}
