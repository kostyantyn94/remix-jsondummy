import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";

import type { ContactRecord } from "../data";

import { updateContact } from "../data";

import { getContact } from "../newData";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  return json({ contact });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.firstName} ${contact.lastName} avatar`}
          key={contact.image}
          src={contact.image}
        />
      </div>

      <div>
        <h1>
          {contact.firstName || contact.lastName ? (
            <>
              {contact.firstName} {contact.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.email ? (
          <p>
            <a href={`mailto:${contact.twitter}`}>{contact.email}</a>
          </p>
        ) : null}

        {contact.university ? <p>{contact.university}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();

  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};