const API_URL = "http://localhost:3000";

export function getTasksList() {
  return fetch(`${API_URL}/tasks`);
}

export function createTask(data) {
  return fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function getTaskById(id) {
  return fetch(`${API_URL}/tasks/${id}`);
}

export function updateTaskStatus(data) {
  const taskStatus = JSON.stringify({ status: data.status });

  return fetch(`${API_URL}/tasks/${data.id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: taskStatus,
  });
}

export function deleteTask(id) {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}

export function updateTitleAndCommentFromTaskById(data) {
  const titleAndCommentJSON = JSON.stringify({
    title: data.title,
    comment: data.comment,
  });

  return fetch(`${API_URL}/tasks/${data.id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: titleAndCommentJSON,
  });
}

export function updateTaskItemsList(data) {
  const dataJSON = JSON.stringify({ items: data.list });
  return fetch(`${API_URL}/tasks/${data.id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: dataJSON,
  });
}
