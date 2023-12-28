import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = ({ counts }) => {
  return (
    <tr className="">
      {Array(counts)
        .fill(true)
        .map((item) => {
          return (
            <td className="px-6 py-4 whitespace-nowrap">
              <Skeleton />
            </td>
          );
        })}
    </tr>
  );
};

export default LoadingSkeleton;

