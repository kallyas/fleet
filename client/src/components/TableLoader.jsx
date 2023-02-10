import React from "react";
import Skeleton from "react-loading-skeleton";

const TableLoader = ({ count }) => {
  return (
    <tr>
      {[...Array(count)].map((_, i) => (
        <td key={i}>
          <Skeleton className="fw-normal" width={150} height={20} />
        </td>
      ))}
    </tr>
  );
};

export default TableLoader;