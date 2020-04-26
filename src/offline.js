import { GET_NOTES } from "./queries";

export const saveNotes = (cache) => {
  const { notes } = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem("notes", jsonNotes);
  } catch (e) {
    console.log(e);
  }
};

export const restoreNotes = () => {
  const jsonNotes = localStorage.getItem("notes");
  if (jsonNotes) {
    try {
      const parseNotes = JSON.parse(jsonNotes);
      return parseNotes;
    } catch (e) {
      console.log(e);
    }
  }
  return [];
};
