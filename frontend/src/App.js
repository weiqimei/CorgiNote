import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NotebooksPage from "./components/NotebooksPage";
import NotesPage from "./components/NotesPage";
import NoteDetailPage from "./components/NoteDetailPage"
import EditNoteForm from "./components/EditNoteForm";
import DeleteNotePage from "./components/DeleteNotePage";
import NotebookDetailPage from "./components/NotebookDetailPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/notebooks">
            <NotebooksPage />
          </Route>
          <Route exact path="/notes">
            <NotesPage />
          </Route>
          <Route exact path="/notes/:id">
            <NoteDetailPage />
          </Route>
          <Route exact path="/notes/:id/edit">
            <EditNoteForm />
          </Route>
          <Route exact path="/notes/:id/delete">
            <DeleteNotePage />
          </Route>
          <Route exact path="/notebooks/:id">
            <NotebookDetailPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
