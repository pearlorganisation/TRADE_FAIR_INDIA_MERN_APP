import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";

// const ExampleWrapper = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="px-4 py-64 bg-slate-900 grid place-content-center">
//       <button
//         onClick={() => setIsOpen(true)}
//         className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
//       >
//         Open Modal
//       </button>
//       <ViewImage isOpen={isOpen} setIsOpen={setIsOpen} />
//     </div>
//   );
// };

const ViewImage = ({ isOpen, setIsOpen, image }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#00373E] text-white p-4 rounded-lg w-full max-w-5xl  shadow-xl cursor-default relative overflow-hidden grid place-items-center"
          >
            <img className="max-h-[75dvh]" src={image} alt="" srcset="" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewImage;
