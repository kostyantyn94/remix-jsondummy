import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPosts } from "../newData.server";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params);
  invariant(params.contactId, "Missing contactId param");
  const posts = await getPosts(params.contactId);

  return json({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }
  return (
    <>
      <h1>Posts</h1>
      <div id="post-container">
        <div>
          {" "}
          {posts.length ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link to={`${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>User has no posts</p>
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
