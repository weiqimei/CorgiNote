import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'
import CreateNotebookForm from "../CreateNotebookForm"
import { NavLink } from "react-router-dom"
import './NotebooksPage.css';

const NotebooksPage = () => {
  const dispatch = useDispatch();
  const allNotebooks = useSelector((state) => state.notebooks)  
  const notebooks = Object.values(allNotebooks)  

  useEffect(() => {
    dispatch(notebooksActions.getAllNotebooks())
  }, [dispatch])
  return (
    <>
      <div>
        <CreateNotebookForm />
        <h2>Notebooks</h2>
        <ul>
          {notebooks.map(notebook => {
            return <li key={notebook.id}>
              <NavLink exact to={`notebooks/${notebook.id}`}>
              <div>
                {notebook.name}
              </div>
              </NavLink>
            </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default NotebooksPage
