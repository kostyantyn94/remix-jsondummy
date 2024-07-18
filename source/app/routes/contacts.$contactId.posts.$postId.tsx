import { json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getPost } from "../newData.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postId, "Missing postId param");
  const post = await getPost(params.postId);

  return json({ post });
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return <div id="post">{post.body}</div>;
}
