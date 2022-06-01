import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK'

const loadNotebooks = notebooks => ({
  type: GET_NOTEBOOKS,
  notebooks
})

const addNotebook = (notebook) => {
  return {
    type: ADD_NOTEBOOK,
    notebook
  }
}

// thunk action creator for getting all notebooks
export const getAllNotebooks = () => async dispatch => {
  const response = await csrfFetch('api/notebooks')

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(loadNotebooks(notebooks))
  }
}

// thunk action creator for creating a notebook
export const createNotebook = (data) => async dispatch => {
  const response = await csrfFetch('api/notebooks', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const notebook = await response.json();

  dispatch(addNotebook(notebook))
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
    case ADD_NOTEBOOK:
      if (!state[action.notebook.id]) {
        const newState = {
          ...state,
          [action.notebook.id]: action.notebook
        }
        const notebooks = newState.notebooks.map(id => newState[id])
        notebooks.push(action.notebook);
        return newState
      }
      break
    default:
      return state;
  }
}

export default notebookReducer
