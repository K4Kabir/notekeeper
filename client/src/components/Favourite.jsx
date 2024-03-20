import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "sonner";
import jwtAxios from "../libs/jwtAxios";
import { motion } from "framer-motion";

const Favourite = ({ selected, styles, data, onSuccess }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <motion.div
      onClick={() => {
        setIsAnimating(true);
        jwtAxios
          .put(`/Note/addtoFav/${data?._id}`)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
          })
          .then(() => {
            onSuccess();
          })
          .catch((e) => {
            toast.error(e.message || "Something went wrong");
          })
          .finally(() => {
            setIsAnimating(false);
          });
      }}
      style={{
        backgroundColor: selected ? "pink" : "",
        color: selected ? "black" : "",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 9,
        margin: 4,
        border: !selected ? "1px solid white" : "",
        ...styles,
      }}
      animate={{ scale: isAnimating ? 1.2 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <FavoriteBorderIcon sx={{ fontSize: "15px" }} />
    </motion.div>
  );
};

export default Favourite;
