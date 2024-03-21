import { useEffect, useRef } from "react";

const InfiniteScroll = ({ renderItem, getData, dataArr }) => {
  const observer = useRef(null);
  const page = useRef(1);
  const lastElementObserver = (node) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Observing");
        page.current += 1;
        getData(page.current, 10);
        getData();
      }
    });
  };

  // useEffect(() => {
  //   getData(page.current, 10);
  // }, [page]);

  return dataArr?.map((item, index) => {
    if (index == dataArr.length - 1)
      return <>{renderItem(item, index, lastElementObserver)}</>;
    return <>{renderItem(item, index)}</>;
  });
};

export default InfiniteScroll;
