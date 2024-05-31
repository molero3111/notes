import { NavLink, useLoaderData } from 'react-router-dom';
import Note from './Note';
import { useEffect, useState } from 'react';
import { sendRequest } from '../../utils/HttpRequest';
import getAbsolutePathUrl from '../../utils/URLManager';
import { Row, Container, Button } from 'react-bootstrap'; 

const Notes = () => {
  const loadedNotes = useLoaderData();
  const [notes, setNotes] = useState(loadedNotes);
  useEffect(() => {
    setNotes(loadedNotes);
  }, [loadedNotes]);
  const deleteNote = async (noteId) => {
    await sendRequest('DELETE', `/notes/${noteId}/`);
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Notes</h1>
      <p className="text-center">
        <NavLink to={getAbsolutePathUrl("notes/new")} className="me-2 mt-3">
          <Button variant="success">Add Note</Button>
        </NavLink>
      </p>
      <Row xs={1} md={3} className="g-4 mt-3"> 
        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </Row>
    </Container>
  );
};

export default Notes;



export async function loadArchivedNotes() {
  return await sendRequest('GET', '/notes/?archived=1');
}

export async function loadNotes() {
  return await sendRequest('GET', '/notes/?archived=0');
}