import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'
import { NavLink } from "react-router-dom"

const NotebookDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const notebook = useSelector((state) => state.notebooks[id])
  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(notebooksActions.getNotebook(id))
  }, [dispatch, id])

  return (
    <>
      {sessionUser?.id === notebook.userId &&
        <div>
          <h1>Notebook Details</h1>
          <h2>{notebook.name}</h2>
          <NavLink to={`/notebooks/${notebook.id}/edit`}>
            Edit
          </NavLink>
          <NavLink to={`/notebooks/${notebook.id}/delete`}>
            Delete
          </NavLink>
        </div>
      }
    </>
  )
}

export default NotebookDetailPage
