import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqList } from "../../features/actions/faqActions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b text-[#00373E]"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg font-medium">
        {faqsList?.question}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5  ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5  ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">{faqsList?.answer}</p>
        </div>
      </div>
    </div>
  );
};

const CommonQuestion = () => {
  const { isLoading, faqData } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaqList());
  }, []);
  useEffect(() => {
    console.log("faqData::", faqData);
  }, [faqData]);
  return (
    <div className="grid place-items-center">
      <section className="leading-relaxed max-w-screen-xl mt-10 mb-10 mx-auto px-4 md:px-8 w-full">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl text-[#00373E] font-semibold">
            Common Questions
          </h1>
        </div>
        <div className="mt-14 max-w-2xl mx-auto">
          {isLoading ? (
            <SkeletonTheme color="#f0f0f0" highlightColor="#e0e0e0">
              {/* Skeleton for each FAQ item */}
              {Array(5)
                .fill(true)
                .map((item) => {
                  return (
                    <div>
                      <Skeleton height={80} />
                    </div>
                  );
                })}
              {/* Add more skeleton structures for additional FAQ items */}
            </SkeletonTheme>
          ) : (
            faqData.map((item, idx) => <FaqsCard idx={idx} faqsList={item} />)
          )}
        </div>
      </section>
    </div>
  );
};
export default CommonQuestion;
