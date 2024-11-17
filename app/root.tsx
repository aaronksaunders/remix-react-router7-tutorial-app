/**
 * @fileoverview Root Layout Component
 * Provides the main application structure and layout.
 * Handles font loading, global styles, and contact list navigation.
 * @module app/root
 */

import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LinksFunction,
} from "react-router";

import "./tailwind.css";
import { createEmptyContact, getSomeContactData } from "./server";

/**
 * Links function for managing external resources
 * @returns {Array<Object>} Array of link objects for font preloading and stylesheets
 */
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

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
 * Layout Component
 * Provides the main application structure including navigation and content areas
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Application layout structure
 */
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
                {data.map((contact) => (
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Root App Component
 * Renders the main application outlet
 * @component
 * @returns {JSX.Element} Application outlet
 */
export default function App() {
  return <Outlet />;
}
