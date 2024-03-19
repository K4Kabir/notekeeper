import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const index = ({ loading, name, type, icon }) => {
  return (
    <LoadingButton
      type={type}
      loading={loading}
      loadingPosition="start"
      startIcon={icon}
      variant="outlined"
    >
      {name}
    </LoadingButton>
  );
};

export default index;
