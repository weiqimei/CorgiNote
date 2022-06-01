import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllNotebooks, createNotebook } from '../../store/notebooks';
import './CreateNotebookForm.css'

const CreateNotebookForm = ({ hideForm }) => {
  const currentUserId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const [userId, setUserId] = useState(currentUserId)
  const [name, setName] = useState('');

  const updateName = (e) => setName(e.target.value);

  useEffect(() => {
    dispatch(getAllNotebooks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      name
    };

    let createdNotebook;
    createdNotebook = await dispatch(createNotebook(payload))
    if (createdNotebook) {
      history.push(`/`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className='form'>
        <div className='add-notebook-text'>Add Notebook</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={updateName} />
        <button className='post-button' type="submit">Post New Notebook</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
}


export default CreateNotebookForm;
