import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeletonLoading = ({ thCount }) => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((item) => {
          return (
            <tr>
              {Array(thCount)
                .fill(0)
                .map((item) => {
                  return (
                    <td>
                      <Skeleton />
                    </td>
                  );
                })}
            </tr>
          );
        })}
    </>
  );
};

export default TableSkeletonLoading;
