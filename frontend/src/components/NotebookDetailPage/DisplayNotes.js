import { NavLink } from "react-router-dom"

function DisplayNotes({ notes, notebookId }) {
  console.log(notes)
  console.log(notebookId)
  return (
    <>
      <h1>Notes In This Notebook</h1>
      <div>
        {notes?.map((note) => {
          return <div
            id={note.id}
            key={note.id}
          >
            <h2>
            <NavLink exact to={`/notes/${note.id}`}>{note.title}</NavLink>
            </h2>
            <h2>{note.content}</h2>
          </div>
        })}
      </div>
    </>
  )
}

export default DisplayNotes
