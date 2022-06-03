import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'
import { NavLink } from "react-router-dom"
import { getAllNotes } from "../../store/notes"
import DisplayNotes from "./DisplayNotes"

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
            <h1>Notebook Details</h1>
            <h2>{notebook.name}</h2>
            <h2>notebook id: {notebook.id}</h2>
            {/* <NavLink to={`/notebooks/${notebook.id}/edit`}>
            Edit
          </NavLink> */}
            <NavLink to={`/notebooks/${notebook.id}/delete`}>
              Delete
            </NavLink>
            <div>
              <DisplayNotes notebookId={id} notes={notesDisplay} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default NotebookDetailPage
