import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FaEye } from "react-icons/fa";
import ViewImage from "./ViewImage";

const ShopPhotos = () => {
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    console.log(state);
  }, [state]);

  const posts = [
    {
      title: "What is SaaS? Software as a Service Explained",
      desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people.",
      img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations.",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
      img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
      img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
      img: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
      img: "https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
  ];
  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  }, []);
  return (
    <div className="min-h-dvh grid place-items-center container mx-auto py-[8rem] px-3">
      <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {state?.map((items, key) => (
          <li
            className="w-full mx-auto group sm:max-w-sm relative group cursor-pointer h-[20rem]"
            key={key}
          >
            <div
              onClick={() => {
                setIsOpen(true);
                setImage(items?.path);
              }}
              className="absolute w-full h-full text-base md:text-3xl md:h-0 bg-black/30 text-white md:group-hover:h-full transition-all overflow-hidden grid place-items-center"
            >
              <FaEye />
            </div>
            <img
              src={items?.path}
              loading="lazy"
              alt={items.title}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </li>
        ))}
      </ul>
      <ViewImage isOpen={isOpen} setIsOpen={setIsOpen} image={image} />
    </div>
  );
};

export default ShopPhotos;
