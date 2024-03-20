import { useEffect, useState } from "react";

const useDebounce = (fn, delay = 300) => {
  
  const [dfn, setDfn] = useState();
  //   useEffect(() => {
  //     const interval = setTimeout(() => {
  //       setDfn(fn);
  //     }, delay);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [data, delay]);

  return dfn;
};

export default useDebounce;
