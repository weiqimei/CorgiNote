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

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/notes/${id}`)
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
        <button className="inner-button" onClick={handleDeleteClick}>Confirm Delete</button>}
      </div>
      <div className="confirm-delete-button">
        {sessionUser?.id === note.userId &&
          <button className="inner-button" onClick={handleCancel}>Cancel</button>}
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


export default DeleteNotePage
