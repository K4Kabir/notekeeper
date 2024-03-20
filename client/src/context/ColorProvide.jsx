import { createContext, useState } from "react";
import { useRecoilState } from "recoil";
import { allNotes } from "./atoms";

export const Theme = createContext();

const ColorProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const [note, setNote] = useRecoilState(allNotes);

  const getNotes = async () => {
    try {
      let response = await jwtAxios.get("/Note/getAll");
      if (response.data.success) {
        setNote(response.data.message);
      } else {
        setNote(null);
      }
    } catch (error) {
      setNote(null);
    }
  };

  return (
    <Theme.Provider value={{ dark, setDark, getNotes }}>
      {children}
    </Theme.Provider>
  );
};

export default ColorProvider;
