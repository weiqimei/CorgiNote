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
      history.push(`/notebooks/${notebookId}`)
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
    <section>
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
        <input
          type="text"
          placeholder={note.notebookId}
          required
          value={notebookId}
          onChange={updateNotebookId} />
        <button type="submit">Update Note</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditNoteForm;
