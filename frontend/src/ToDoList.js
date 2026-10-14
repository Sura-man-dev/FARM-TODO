import "./ToDoList.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BiArrowBack, BiPlus, BiSolidTrash } from "react-icons/bi";

function ToDoList({ listId, handleBackButton }) {
  const inputRef = useRef(null);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/lists/${listId}`);
      setListData(data);
    };

    fetchData().catch(console.error);
  }, [listId]);

  async function handleCreateItem(label) {
    const trimmedLabel = label?.trim();
    if (!trimmedLabel || !listData) {
      return;
    }

    const { data } = await axios.post(`/api/lists/${listData.id}/items/`, {
      label: trimmedLabel,
    });

    setListData(data);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleDeleteItem(itemId) {
    const { data } = await axios.delete(`/api/lists/${listData.id}/items/${itemId}`);
    setListData(data);
  }

  async function handleCheckToggle(itemId, newState) {
    const { data } = await axios.patch(`/api/lists/${listData.id}/checked_state`, {
      item_id: itemId,
      checked_state: newState,
    });

    setListData(data);
  }

  if (listData === null) {
    return (
      <div className="ToDoList loading">
        <button className="back-button" onClick={handleBackButton}>
          <BiArrowBack /> Back
        </button>
        <div className="loading-text">Loading to-do list...</div>
      </div>
    );
  }

  return (
    <div className="ToDoList">
      <header className="todo-header">
        <button className="back-button" onClick={handleBackButton}>
          <BiArrowBack /> Back
        </button>
        <div>
          <p className="eyebrow">List details</p>
          <h1>{listData.name}</h1>
        </div>
      </header>

      <div className="panel input-panel">
        <label className="field-label" htmlFor="new-item-name">
          New item
        </label>
        <div className="input-row">
          <input
            id="new-item-name"
            ref={inputRef}
            type="text"
            placeholder="Add a task"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCreateItem(inputRef.current?.value);
              }
            }}
          />
          <button type="button" className="primary-button" onClick={() => handleCreateItem(inputRef.current?.value)}>
            <BiPlus /> Add
          </button>
        </div>
      </div>

      {listData.items.length === 0 ? (
        <div className="empty-state panel">
          <p>No tasks yet.</p>
          <span>Add the first item to this list.</span>
        </div>
      ) : (
        <div className="task-list">
          {listData.items.map((item) => (
            <div
              key={item.id}
              className={item.checked ? "task-item checked" : "task-item"}
              onClick={() => handleCheckToggle(item.id, !item.checked)}
            >
              <span className="task-status">{item.checked ? "✅" : "◻️"}</span>
              <span className="task-label">{item.label}</span>
              <span className="spacer" />
              <button
                type="button"
                className="icon-button"
                aria-label={`Delete ${item.label}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteItem(item.id);
                }}
              >
                <BiSolidTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToDoList;