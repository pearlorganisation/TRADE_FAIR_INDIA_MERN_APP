import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export const EventPagination = () => {
  const [items, setItems] = useState([]);
  const [active, setactive] = useState(2);
  const [number, setNumber] = useState(2);
  const pages = [
    <Pagination.Item key={1} active={1 === active}>
      {1}
    </Pagination.Item>,
    <Pagination.Item key={2} active={2 === active}>
      {2}
    </Pagination.Item>,
    <Pagination.Item key={3} active={3 === active}>
      {3}
    </Pagination.Item>,
  ];
  // <Pagination.Item key={number} active={number === active}>
  //         {number}
  //       </Pagination.Item>
  useEffect(() => {
    setItems([...pages]);
  }, []);

  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
};
