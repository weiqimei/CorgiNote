import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as notesActions from '../../store/notes'

const NotesPage = () => {
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes)
  const notes = Object.values(allNotes)

  useEffect(() => {
    dispatch(notesActions.getAllNotes())
  }, [dispatch])
  return (
    <>
      <div>
        <h2>Notes</h2>
        <ul>
          {notes.map(note => {
            return <li key={note.id}>
              <div>
                {note.title}
              </div>
            </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default NotesPage
