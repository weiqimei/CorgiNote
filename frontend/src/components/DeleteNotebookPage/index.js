import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { removeNotebook } from "../../store/notebooks";
import { NavLink } from "react-router-dom";

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
      <div class="dog">
        <div class="heart heart--1"></div>
        <div class="heart heart--2"></div>
        <div class="heart heart--3"></div>
        <div class="heart heart--4"></div>
        <div class="head">
          <div class="year year--left"></div>
          <div class="year year--right"></div>
          <div class="nose"></div>
          <div class="face">
            <div class="eye eye--left"></div>
            <div class="eye eye--right"></div>
            <div class="mouth"></div>
          </div>
        </div>
        <div class="body">
          <div class="cheast"></div>
          <div class="back"></div>
          <div class="legs">
            <div class="legs__front legs__front--left"></div>
            <div class="legs__front legs__front--right"></div>
            <div class="legs__back legs__back--left"></div>
            <div class="legs__back legs__back--right"></div>
          </div>
          <div class="tail"></div>
        </div>
      </div>
    </>
  )
}


export default DeleteNotebookPage
