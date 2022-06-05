import { NavLink } from "react-router-dom";
import './NotebookDetailPage.css'

function DisplayNotes({ notes, notebookId }) {
  console.log(notes)
  console.log(notebookId)
  return (
    <>
      <div className="notes-in-notebook">
      <h1 className="notes-in-notebook-text">Notes In This Notebook</h1>
        {notes?.map((note) => {
          return <div
            id={note.id}
            key={note.id}
          >
            <h2 className="notebook-details-box1">
            <NavLink exact to={`/notes/${note.id}`}>{note.title}</NavLink>
            </h2>
            <h3 className="notebook-details-box1">{note.content}</h3>
          </div>
        })}
      </div>
    </>
  )
}

export default DisplayNotes
