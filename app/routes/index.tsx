/**
 * @fileoverview Index Route Component
 * Serves as the landing page for the application.
 * Displays welcome message and application description.
 * @module routes/index
 */

import type { MetaFunction } from "react-router";

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
 * Index Page Component
 * Renders the landing page of the application
 * @component
 * @returns {JSX.Element} Landing page content
 */
export default function Index() {
  return (
    <div className="flex h-screen mt-8 justify-center text-2xl">
      Sample Application based on the Remix Tutorial but using react router v7
      and saving the data in a sqlite database
    </div>
  );
}
