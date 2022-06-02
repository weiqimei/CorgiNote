import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'
import { NavLink } from "react-router-dom"

const NotebookDetailPage = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks)
  const { id } = useParams()
  const notebook = Object.values(notebooks)
  const sessionUser = useSelector((state) => state.session.user)


  useEffect(() => {
    dispatch(notebooksActions.getNotebook(id))
  }, [dispatch, id])


  return (
    <>
      {sessionUser?.id === notebook[0].userId &&
        <div>
          <h1>Notebook Details</h1>
          <h2>{notebook[0].name}</h2>
          <NavLink to={`/notebooks/${notebook[0].id}/edit`}>
            Edit
          </NavLink>
          <NavLink to={`/notebooks/${notebook[0].id}/delete`}>
            Delete
          </NavLink>
        </div>
      }
    </>
  )
}

export default NotebookDetailPage
