import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as notesActions from '../../store/notes'
import CreateNoteForm from "../CreateNoteForm"
import { NavLink } from "react-router-dom"
import './NotesPage.css'

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
        <CreateNoteForm />
        <div className="notes-list">
          <h2>Notes</h2>
          <ul>
            {notes.map(note => {
              return <li key={note.id}>
                <NavLink exact to={`notes/${note.id}`}>
                <div>
                  {note.title}
                </div>
                </NavLink>
                <div>
                  {note.content}
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default NotesPage
