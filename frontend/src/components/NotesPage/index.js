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
        <div className="notebook-divider"></div>
        <h2 className="notebooks-title">Notes</h2>
        <div className="notebook-box">
          {notes.map(note => {
            return <div key={note.id}>
              <div className="each-note">
                <NavLink exact to={`notes/${note.id}`}>
                  <div className="note-title">
                    {note.title}
                  </div>
                </NavLink>
                <div className="note-content">
                  {note.content}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default NotesPage
