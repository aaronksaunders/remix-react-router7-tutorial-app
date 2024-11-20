/**
 * @fileoverview Index Route Component
 * Serves as the landing page for the application.
 * Displays welcome message and application description.
 * @module routes/index
 */

import { Form, Link, Outlet, type MetaFunction } from "react-router";
import { createEmptyContact, getSomeContactData } from "~/server";
import { Contact } from "~/types";
import { Route } from ".react-router/types/app/routes/+types.index";

/**
 * Meta function for the index route
 * Defines page metadata including title and description
 * @returns {Array<Object>} Array of meta objects for the page
 */
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

/**
 * Root loader function
 * Fetches initial contact data for the sidebar
 * @async
 * @returns {Promise<Array<Contact>>} Array of contacts
 */
export const loader = async () => {
  const data = await getSomeContactData();
  return data;
};

/**
 * Root action function
 * Handles creation of new contacts
 * @async
 * @returns {Promise<{contact: Contact}>} Newly created contact
 */
export const action = async () => {
  const contact = await createEmptyContact();
  return { contact };
};

/**
 * Index Page Component
 * Renders the landing page of the application
 * @component
 * @returns {JSX.Element} Landing page content
 */
export default function Index({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="w-96 flex flex-col border-r border-gray-200 p-4">
        <h1 className="text-2xl font-semibold mb-4">
          React Router v7 - Contacts
        </h1>

        {/* Search and New Contact Forms */}
        <div className="flex gap-2 justify-between items-center">
          <Form
            id="search-form"
            role="search"
            className="flex-1 flex items-center"
          >
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className="border border-gray-300 rounded-md p-2 flex-1"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
          </Form>
          <Form method="post" className="">
            <button
              type="submit"
              className="border border-gray-300 rounded-md p-2 px-4"
            >
              New
            </button>
          </Form>
        </div>

        {/* Contact List Navigation */}
        <nav className="flex-1 mt-4">
          <ul className="flex flex-col gap-2">
            {data.map((contact: Contact) => (
              <Link to={`/contacts/${contact.id}`} key={contact.id}>
                <li className="p-2 rounded-md hover:bg-gray-100">
                  {contact.first} {contact.last}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div id="detail" className="flex-1 w-full p-8">
        <Outlet />
      </div>
    </div>
  );
}
