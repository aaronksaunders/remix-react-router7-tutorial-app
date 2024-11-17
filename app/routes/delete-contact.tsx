/**
 * @fileoverview Delete Contact Route
 * Handles the deletion of contacts from the database.
 * This is an action-only route that processes DELETE requests and redirects to the home page.
 * @module routes/delete-contact
 */

import { Route } from ".react-router/types/app/routes/+types.delete-contact";
import { redirect } from "react-router-dom";
import { deleteContact } from "~/server";

/**
 * Action function to handle contact deletion
 * @async
 * @param {Object} args - Action arguments
 * @param {Object} args.params - URL parameters
 * @param {string} [args.params.id] - ID of the contact to delete
 * @returns {Promise<Response>} Redirects to home page after successful deletion
 * @throws {Error} If contact ID is not provided or deletion fails
 */
export const action = async ({ params }: Route.ActionArgs) => {
  await deleteContact(params?.id);
  return redirect("/");
};
