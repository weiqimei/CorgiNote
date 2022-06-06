import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notesActions from '../../store/notes'
import { NavLink } from "react-router-dom";
import './NoteDetailPage.css'

const NoteDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const note = useSelector((state) => state.notes[id])
  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(notesActions.getNote(id))
  }, [dispatch, id])

  return (
    <>
      {sessionUser?.id === note.userId &&
        <div>
          <h1 className="note-details-text">Note Details</h1>
          <div className="note-details">
            <h1 className="note-details-box1">{note.title}</h1>
            <h3 className="note-details-box1">{note.content}</h3>
            <div className="delete-note note-details-box1">
            <NavLink to={`/notes/${note.id}/edit`}>
              Edit
            </NavLink>
            </div>
            <div className="delete-note note-details-box1">
            <NavLink to={`/notes/${note.id}/delete`}>
              Delete
            </NavLink>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default NoteDetailPage
