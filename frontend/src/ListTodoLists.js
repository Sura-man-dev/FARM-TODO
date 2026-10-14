import "./ListTodoLists.css";
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

function ListTodoLists({
  listSummaries,
  handleSelectList,
  handleNewToDoList,
  handleDeleteToDoList,
}) {
  const inputRef = useRef(null);

  const createList = () => {
    const value = inputRef.current?.value.trim();
    if (!value) {
      return;
    }

    handleNewToDoList(value);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  if (listSummaries === null) {
    return <div className="ListTodoLists loading">Loading to-do lists...</div>;
  }

  return (
    <div className="ListTodoLists">
      <header className="list-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>All To-Do Lists</h1>
        </div>
      </header>

      <div className="panel input-panel">
        <label className="field-label" htmlFor="new-list-name">
          New list
        </label>
        <div className="input-row">
          <input
            id="new-list-name"
            ref={inputRef}
            type="text"
            placeholder="Add a new list"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                createList();
              }
            }}
          />
          <button type="button" className="primary-button" onClick={createList}>
            Create
          </button>
        </div>
      </div>

      {listSummaries.length === 0 ? (
        <div className="empty-state panel">
          <p>There are no to-do lists yet.</p>
          <span>Create your first list to get started.</span>
        </div>
      ) : (
        <div className="list-grid">
          {listSummaries.map((summary) => (
            <div
              key={summary.id}
              className="summary-card"
              onClick={() => handleSelectList(summary.id)}
            >
              <div className="summary-main">
                <span className="summary-name">{summary.name}</span>
                <span className="summary-count">
                  {summary.item_count} item{summary.item_count === 1 ? "" : "s"}
                </span>
              </div>

              <button
                type="button"
                className="icon-button"
                aria-label={`Delete ${summary.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteToDoList(summary.id);
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

export default ListTodoLists;