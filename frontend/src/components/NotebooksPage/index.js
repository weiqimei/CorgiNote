import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as notebooksActions from '../../store/notebooks'

const NotebooksPage = () => {
  const dispatch = useDispatch();
  const allNotebooks = useSelector((state) => state.notebooks)  
  console.log(allNotebooks)
  const notebooks = Object.values(allNotebooks)
  console.log(notebooks)
  

  useEffect(() => {
    dispatch(notebooksActions.getAllNotebooks())
  }, [dispatch])
  return (
    <>
      <div>
        <h2>Notebooks</h2>
        <ul>
          {notebooks.map(notebook => {
            return <li key={notebook.id}>
              <div>
                {notebook.name}
              </div>
            </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default NotebooksPage
