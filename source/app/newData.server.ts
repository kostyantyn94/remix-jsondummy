type Contact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  email?: string;
  city?: string;
  department?: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Record<string, number>;
  views: number;
  userId: number;
};

const USERS = "https://dummyjson.com/users";
const POSTS = "https://dummyjson.com/posts";

export async function getContacts(): Promise<Contact[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch(USERS);
  const data = await res.json();
  const contacts = data.users;

  return contacts;
}

export async function getContact(id: string): Promise<Contact> {
  const res = await fetch(`${USERS}/${id}`);
  const user = await res.json();
  return user;
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(POSTS);
  const data = await res.json();
  const posts = data.posts;

  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${POSTS}/${id}`);
  const post = await res.json();
  return post;
}
