import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateNote, getNote } from '../../store/notes';

const EditNoteForm = () => {
  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const noteId = useParams()
  const id = noteId.id
  const note = useSelector((state) => state.notes[id]);
  const [errors, setErrors] = useState([]);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState('');
  const [notebookId, setNotebookId] = useState('');

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateNotebookId = (e) => setNotebookId(e.target.value);

  useEffect(() => {
    const errors = [];

    if (title.length >= 50) errors.push("Notebook title must be less than 50 characters")
    setErrors(errors)

  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...note,
      userId,
      title,
      content,
      notebookId
    };

    let updatedNote;
    updatedNote = await dispatch(updateNote(payload))
    if (updatedNote) {
      history.push(`/notebooks/${updatedNote.notebookId}`)
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/notes/${note.id}`)
  };

  useEffect(() => {
    dispatch(getNote(id))
  }, [dispatch, id])

  return (
    <div>
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <div className='error-message'>
          {errors.map((error) => <div key={error}>{error}</div>)}
        </div>
        <input
          type="text"
          placeholder={note.title}
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder={note.content}
          required
          value={content}
          onChange={updateContent} />
        {/* <input
          type="text"
          placeholder={note.notebookId}
          required
          value={notebookId}
          onChange={updateNotebookId} /> */}
        <button className='post-button' type="submit">Update Note</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
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
    </div>
  );
};

export default EditNoteForm;
