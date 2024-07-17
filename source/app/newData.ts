import { matchSorter } from "match-sorter";

export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  let contacts = data.users;

  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["firstName", "lastName"],
    });
  }
  return contacts;
}

export async function getContact(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const user = await res.json();
  return user;
}
