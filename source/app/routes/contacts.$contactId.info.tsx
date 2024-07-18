import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getContact } from "../newData.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  return json({ contact });
};

export default function Info() {
  const { contact } = useLoaderData<typeof loader>();
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return (
    <div>
      <h1>Info</h1>
      <p>First Name: {contact.firstName}</p>
      <p>Second Name: {contact.lastName}</p>
      <p>Age: {contact.age}</p>
      <p>City: {contact.address?.city}</p>
      <p>Department: {contact.company?.department}</p>
    </div>
  );
}
