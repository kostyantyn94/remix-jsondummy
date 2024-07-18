type Address = {
  city: string;
};

type Company = {
  department: string;
};

type Contact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  email?: string;
  address?: Address;
  company?: Company;
  age?: number;
  university?: string;
  favorite?: boolean;
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

export async function getPosts(userId: string): Promise<Post[]> {
  const res = await fetch(`${POSTS}/user/${userId}`);
  const data = await res.json();
  console.log(data);
  const posts = data.posts;

  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${POSTS}/${id}`);
  const post = await res.json();
  return post;
}
