import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    isAuthenticated: false,
    user: {},
  },
});

export const noteAtom = atom({
  key: "note",
  default: {},
});

export const allNotes = atom({
  key: "allNotes",
  default: null,
});
