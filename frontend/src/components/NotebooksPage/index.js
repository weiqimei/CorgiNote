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
        <div className="notebook-divider"></div>
        <h2 className="notebooks-title">Notebooks</h2>
        <div className="notebook-box">
          {notebooks.map(notebook => {
            return <div key={notebook.id}>
              <NavLink exact to={`notebooks/${notebook.id}`}>
                <div className="each-notebook">
                {notebook.name}
              </div>
              </NavLink>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default NotebooksPage
