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
  type LinksFunction,
} from "react-router";

import "./tailwind.css";
import { createEmptyContact, getSomeContactData } from "./server";
import { Route } from ".react-router/types/app/routes/+types.root";
import React, { Children } from "react";

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
 * Layout Component
 * Provides the main application structure including navigation and content areas
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Application layout structure
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
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
