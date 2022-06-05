import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'
import { NavLink } from "react-router-dom"
import { getAllNotes } from "../../store/notes"
import DisplayNotes from "./DisplayNotes"
import './NotebookDetailPage.css'

const NotebookDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const notebook = useSelector((state) => state.notebooks[id])
  const sessionUser = useSelector((state) => state.session.user)
  const notes = useSelector((state) => state.notes)
  const notesDisplay = Object.values(notes)

  useEffect(() => {
    dispatch(notebooksActions.getNotebook(id))
    dispatch(getAllNotes(id))
  }, [dispatch, id])


  return (
    <>
      <div>
        {sessionUser?.id === notebook.userId &&
          <div>
            <div>
              <h1 className="notebook-details-text">Notebook Details</h1>
              <div className="notebook-details">
                <h1 className="notebook-details-box1">{notebook.name}</h1>
                <h2 className="notebook-details-box1">notebook id: {notebook.id}</h2>
                {/* <NavLink to={`/notebooks/${notebook.id}/edit`}>
            Edit
          </NavLink> */}
                <div className="notebook-details-box1">
                  <NavLink to={`/notebooks/${notebook.id}/delete`}>
                    Delete
                  </NavLink>
                </div>
              </div>
            </div>
            <div>
              <DisplayNotes notebookId={id} notes={notesDisplay} />
            </div>
          </div>
        }
      </div>

      {/* <div class="main">
        <div class="dog">
          <div class="dog__paws">
            <div class="dog__bl-leg leg">
              <div class="dog__bl-paw paw"></div>
              <div class="dog__bl-top top"></div>
            </div>
            <div class="dog__fl-leg leg">
              <div class="dog__fl-paw paw"></div>
              <div class="dog__fl-top top"></div>
            </div>
            <div class="dog__fr-leg leg">
              <div class="dog__fr-paw paw"></div>
              <div class="dog__fr-top top"></div>
            </div>
          </div>
          <div class="dog__body">
            <div class="dog__tail"></div>
          </div>
          <div class="dog__head">
            <div class="dog__snout">
              <div class="dog__nose"></div>
              <div class="dog__eyes">
                <div class="dog__eye-l"></div>
                <div class="dog__eye-r"></div>
              </div>
            </div>
          </div>
          <div class="dog__head-c">
            <div class="dog__ear-l"></div>
            <div class="dog__ear-r"></div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default NotebookDetailPage
