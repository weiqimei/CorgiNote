import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notesActions from '../../store/notes'

const NoteDetailPage = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes)
  console.log(notes)
  const { id } = useParams()
  console.log(id)
  const note = Object.values(notes)
  console.log(note)
  const sessionUser = useSelector((state) => state.session.user)
  console.log(sessionUser)

  useEffect(() => {
    dispatch(notesActions.getNote(id))
  }, [dispatch, id])


  return (
    <>
      {sessionUser?.id === note[0].userId &&
        <div>
          <h1>Note Details</h1>
          <h2>{note[0].title}</h2>
          <h3>{note[0].content}</h3>
        </div>
      }
    </>
  )
}

export default NoteDetailPage
