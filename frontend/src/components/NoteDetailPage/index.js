import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notesActions from '../../store/notes'
import { NavLink } from "react-router-dom"

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
          <h1>Note Details</h1>
          <h2>{note.title}</h2>
          <h3>{note.content}</h3>
          <NavLink to={`/notes/${note.id}/edit`}>
            Edit
          </NavLink>
          <NavLink to={`/notes/${note.id}/delete`}>
            Delete
          </NavLink>
        </div>
      }
    </>
  )
}

export default NoteDetailPage
