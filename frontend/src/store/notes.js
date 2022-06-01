import { csrfFetch } from "./csrf";

const GET_NOTES = 'notes/GET_NOTES'

const loadNotes = notes => ({
  type: GET_NOTES,
  notes
})

// thunk action creator for getting all notes
export const getAllNotes = () => async dispatch => {
  const response = await csrfFetch('api/notes')

  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes))
  }
}

const initialState = {}

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      const allNotes = {};
      action.notes.forEach(note => {
        allNotes[note.id] = note
      })
      return {
        ...allNotes
      }
      break
    default:
      return state;
  }
}

export default noteReducer
