import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedNote, setSelectedNote] = useState("");

  const fetchNotes = async () => {
    const allNotes = await axios.get("http://localhost:3000/notes");

    setNotes(allNotes.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (selectedNote) {
      await axios.put(`http://localhost:3000/notes/${selectedNote._id}`, {
        title,
        body,
      });
      console.log("Note updated");
    } else {
      await axios
        .post("http://localhost:3000/notes", { title, body })
        .then(() => console.log("Note added"))
        .catch((error) => console.log(error));
      console.log("Note added");
    }

    fetchNotes();
    setBody("");
    setTitle("");
    setSelectedNote("");
  };

  const updateHandler = (note) => {
    setBody(note.body);
    setTitle(note.title);
    setSelectedNote(note);
  };

  const deleteHandler = async (_id) => {
    await axios.delete(`http://localhost:3000/notes/${_id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          cols="30"
          rows="10"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder="Enter content"
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="mt-8">
        {notes &&
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 mb-4 rounded shadow-md"
            >
              <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
              <p>{note.body}</p>
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-700"
                  onClick={() => updateHandler(note)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
