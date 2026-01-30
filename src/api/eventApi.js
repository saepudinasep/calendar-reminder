// const BASE_URL = "/api/exec";
const BASE_URL = import.meta.env.VITE_API_BASE;

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}?action=list`);
  return res.json();
};

export const createEvent = async (data) => {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "create",
      ...data,
    }),
  });
};

export const updateEvent = async (data) => {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "update",
      ...data,
    }),
  });
};

export const deleteEvent = async (id) => {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      id,
    }),
  });
};
