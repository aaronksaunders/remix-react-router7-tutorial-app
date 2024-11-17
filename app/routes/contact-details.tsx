/**
 * @fileoverview Contact Details Route Component
 * Handles displaying individual contact information, including avatar, personal details,
 * and actions like favoriting, editing, and deleting contacts.
 */

import { data, Form, redirect, useLoaderData } from "react-router";
import type { Contact } from "../types";
import { FunctionComponent } from "react";
import {
  Route,
  RouteModule,
} from ".react-router/types/app/routes/+types.contact-details";
import { getContact, updateContact } from "~/server";

/**
 * Loader function to fetch contact data by ID
 * @async
 * @param {Object} args - Loader arguments
 * @param {Object} args.params - URL parameters
 * @param {string} args.params.id - Contact ID
 * @returns {Promise<{ contact: Contact }>} Contact data
 */
export const loader = async ({ params }: Route.LoaderArgs) => {
  const contact = await getContact(params.id);
  return data({ contact });
};

/**
 * Action function to handle contact favorite status updates
 * @async
 * @param {Object} args - Action arguments
 * @param {Request} args.request - Request object
 * @param {Object} args.params - URL parameters
 * @param {string} args.params.id - Contact ID
 * @returns {Promise<Response>} Redirect response
 */
export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const favorite = formData.get("favorite") === "true" ? true : false;
  await updateContact(params.id, { favorite });
  return redirect(`/contacts/${params.id}`);
};

/**
 * Contact Details Page Component
 * Displays all information about a single contact
 * @returns {JSX.Element} Contact details page
 */
export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  if (!contact) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h1 className="text-xl font-bold text-red-800 mb-1">Error !</h1>
        <p className="text-red-700">Contact Not Found</p>
      </div>
    );
  }

  return (
    <div id="contact">
      <div>
        {contact.avatar && (
          <img
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
            className="w-24 h-24 object-cover rounded-md mb-2"
          />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : (
          <p>NO TWITTER HANDLE</p>
        )}

        {contact.notes ? <p>{contact.notes}</p> : <p>NO NOTES</p>}

        <div className="flex gap-2 mt-2">
          <Form action="edit">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </Form>

          <Form
            action="delete"
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
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

/**
 * Favorite Toggle Component
 * Renders a star button that toggles the favorite status of a contact
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact object
 * @param {boolean} props.contact.favorite - Whether the contact is favorited
 * @returns {JSX.Element} Favorite toggle button
 */
const Favorite: FunctionComponent<{
  contact: Pick<Contact, "favorite">;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
