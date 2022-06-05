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
              <NavLink exact to={`/notebooks/${notebook.id}`}>
                <div className="each-notebook">
                {notebook.name}
              </div>
              </NavLink>
            </div>
          })}
        </div>
      </div>
      <div class="dog">
        <div class="heart heart--1"></div>
        <div class="heart heart--2"></div>
        <div class="heart heart--3"></div>
        <div class="heart heart--4"></div>
        <div class="head">
          <div class="year year--left"></div>
          <div class="year year--right"></div>
          <div class="nose"></div>
          <div class="face">
            <div class="eye eye--left"></div>
            <div class="eye eye--right"></div>
            <div class="mouth"></div>
          </div>
        </div>
        <div class="body">
          <div class="cheast"></div>
          <div class="back"></div>
          <div class="legs">
            <div class="legs__front legs__front--left"></div>
            <div class="legs__front legs__front--right"></div>
            <div class="legs__back legs__back--left"></div>
            <div class="legs__back legs__back--right"></div>
          </div>
          <div class="tail"></div>
        </div>
      </div>
    </>
  )
}

export default NotebooksPage
