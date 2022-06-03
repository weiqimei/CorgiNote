import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { removeNote, getNote } from "../../store/notes";

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
      <div>
        Are you sure you want to delete?
      </div>
      <div>
        {sessionUser?.id === note.userId && <button onClick={handleDeleteClick}>YES DELETE IT</button>}
      </div>
    </>
  )
}


export default DeleteNotePage
