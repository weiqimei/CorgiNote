import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { removeNote, getNote } from "../../store/notes";
import './Delete.css'

const DeleteNotePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);
  const note = notes[id]
  const sessionUser = useSelector((state) => state.session.user)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(removeNote(id))
    history.push("/notebooks")
  }

  useEffect(() => {
    dispatch(getNote(id))
  }, [dispatch, id])

  return (
    <>
      <div className="confirm-delete-text">
        Are you sure you want to delete this note?
      </div>
      <div className="confirm-delete-button">
        {sessionUser?.id === note.userId && 
        <button className="inner-button" onClick={handleDeleteClick}>CONFIRM DELETE</button>}
      </div>
    </>
  )
}


export default DeleteNotePage
