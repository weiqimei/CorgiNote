import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK'
const GET_ONE = 'notebooks/GET_ONE'
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK'

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

const loadOneNotebook = (notebook) => {
  return {
    type: GET_ONE,
    notebook
  }
}

const deleteNotebook = (notebook) => {
  return {
    type: DELETE_NOTEBOOK,
    notebook
  }
}

// thunk action creator for getting all notebooks
export const getAllNotebooks = () => async dispatch => {
  const response = await csrfFetch('/api/notebooks')

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(loadNotebooks(notebooks))
  }
}

// thunk action creator for creating a notebook
export const createNotebook = (data) => async dispatch => {
  const response = await csrfFetch('/api/notebooks', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const notebook = await response.json();

  dispatch(addNotebook(notebook))

  return notebook
}

// thunk action creator for getting one notebook
export const getNotebook = (id) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`)

  if (response.ok) {
    const notebook = await response.json();
    dispatch(loadOneNotebook(notebook))
    return response
  }
}

// thunk action creator for deleting a notebook
export const removeNotebook = (id) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    const notebook = await response.json()
    dispatch(deleteNotebook(notebook));
    return
  }
}

const initialState = {}

const notebookReducer = (state = initialState, action) => {
  const newState = { ...state }
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
        return newState
      }
      break
    case GET_ONE:
      const notebook = {};
      notebook[action.notebook.id] = action.notebook
      return {
        ...notebook
      } 
    case DELETE_NOTEBOOK:
      for (let notebook in state.notebooks) {
        if (notebook.id === action.notebook.id) {
          delete action.notebook
          return newState
        }
        else {
          return notebook
        }
      }
      return newState
    default:
      return state;
  }
}

export default notebookReducer
