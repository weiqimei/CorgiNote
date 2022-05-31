import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'

const loadNotebooks = notebook => ({
  type: GET_NOTEBOOKS,
  notebook
})

// thunk action creator for getting all notes
export const getAllNotebooks = () => async dispatch => {
  const response = await csrfFetch('api/notebooks')

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(loadNotebooks(notebooks))
  }
}

const initialState = {}

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTEBOOKS:
      const allNotebooks = {};
      action.notebooks.forEach(notebook => {
        allNotebooks[notebook.id] = notebook
      })
      return {
        ...allNotebooks
      }
    default:
      return state;
  }
}

export default notebookReducer
