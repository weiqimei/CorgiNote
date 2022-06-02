import { csrfFetch } from "./csrf";

const GET_NOTES = 'notes/GET_NOTES'
const ADD_NOTE = 'notes/ADD_NOTE'
const GET_ONE = 'notes/GET_ONE'

const loadNotes = notes => ({
  type: GET_NOTES,
  notes
})

const addNote = (note) => {
  return {
    type: ADD_NOTE,
    note
  }
}

const loadOneNote = (note) => {
  return {
    type: GET_ONE,
    note
  }
}

// thunk action creator for getting all notes
export const getAllNotes = () => async dispatch => {
  const response = await csrfFetch('api/notes')

  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes))
  }
}

// thunk action creator for creating a note
export const createNote = (data) => async dispatch => {
  const response = await csrfFetch('/api/notes', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const note = await response.json();

  dispatch(addNote(note))

  return note
}

// thunk action creator for getting one note
export const getNote = (id) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${id}`)

  if (response.ok) {
    const note = await response.json();
    dispatch(loadOneNote(note))
    return response
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
    case ADD_NOTE:
      if (!state[action.note.id]) {
        const newState = {
          ...state,
          [action.note.id]: action.note
        }
        return newState
      }
      break
    case GET_ONE:
      const note = {};
      note[action.note.id] = action.note
      return {
        ...note
      }
    default:
      return state;
  }
}

export default noteReducer
