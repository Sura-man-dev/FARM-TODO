import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListTodoLists from "./ListTodoLists";
import ToDoList from "./ToDoList";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);

  async function reloadData() {
    const { data } = await axios.get("/api/lists");
    setListSummaries(data);
  }

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function handleNewToDoList(name) {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      return;
    }

    await axios.post("/api/lists", { name: trimmedName });
    await reloadData();
  }

  async function handleDeleteToDoList(id) {
    await axios.delete(`/api/lists/${id}`);
    await reloadData();
  }

  function handleSelectList(id) {
    setSelectedListId(id);
  }

  function backToList() {
    setSelectedListId(null);
    reloadData().catch(console.error);
  }

  if (selectedListId === null) {
    return (
      <div className="App">
        <ListTodoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <ToDoList listId={selectedListId} handleBackButton={backToList} />
    </div>
  );
}

export default App;