import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllNotes, createNote } from '../../store/notes';
import './CreateNoteForm.css'

const CreateNoteForm = ({ hideForm, notebooks }) => {
  const currentUserId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const [userId, setUserId] = useState(currentUserId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notebookId, setNotebookId] = useState('');
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateNotebookId = (e) => setNotebookId(e.target.value);

  useEffect(() => {
    const errors = [];

    if (title.length >= 50) errors.push("Notebook title must be less than 50 characters")
    if (isNaN(notebookId)) errors.push("notebookId must be a number")

    setErrors(errors)

  }, [title, notebookId])

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  const reset = () => {
    setTitle("");
    setContent("");
    setNotebookId("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      title,
      content,
      notebookId
    };

    let createdNote;
    createdNote = await dispatch(createNote(payload))
    if (createdNote) {
      history.push(`/notebooks/${createdNote.notebookId}`);
      reset()
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/notes/new');
    reset()
  };

  return (
    <>
      <section className='form'>
        <div className='add-note-text'>Add Note</div>
        <form onSubmit={handleSubmit}>
          <div className='error-message'>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle} />
          <input
            type="text"
            placeholder="Content"
            required
            value={content}
            onChange={updateContent} />
          <input
          type="text"
          placeholder="NotebookId"
          required
          value={notebookId}
          onChange={updateNotebookId} />
          {/* <div className='dropdown'>

            <label>
              <select
              >
                {notebooks?.map(notebook => (
                  <option
                  key={notebook.id}
                    value={notebook.name}
                  >
                    {notebook.name}
                  </option>
                ))}
              </select>
            </label>
          </div> */}


          <button className='post-button' type="submit">Post New Note</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
      {/* <div class="dog">
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
      </div> */}
    </>
  );
}


export default CreateNoteForm;
