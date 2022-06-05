import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { removeNotebook } from "../../store/notebooks";

const DeleteNotebookPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const notebooks = useSelector((state) => state.notebooks);
  const notebook = notebooks[id]
  const sessionUser = useSelector((state) => state.session.user)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(removeNotebook(id))
    history.push("/notebooks")
  }

  return (
    <>
      <div className="confirm-delete-text">
        Are you sure you want to delete this notebook?
      </div>
      <div className="confirm-delete-button">
        {sessionUser?.id === notebook.userId && <button className="inner-button" onClick={handleDeleteClick}>CONFIRM DELETE</button>}
      </div>
    </>
  )
}


export default DeleteNotebookPage
