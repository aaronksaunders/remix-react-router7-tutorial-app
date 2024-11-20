/**
 * @fileoverview Edit Contact Route Component
 * Handles the editing of contact information including personal details and avatar upload.
 * Supports image file selection with preview functionality and form submission.
 */

import { Route } from ".react-router/types/app/routes/+types.contact-details";
import {
  Form,
  isRouteErrorResponse,
  redirect,
  useRouteError,
  useNavigate,
} from "react-router";
import { getContact, updateContact } from "~/server";
import { useState, useRef } from "react";

/**
 * Loader function to fetch contact data for editing
 * @async
 * @param {Object} args - Loader arguments
 * @param {Object} args.params - URL parameters containing contact ID
 * @returns {Promise<{ contact: Contact }>} Contact data
 * @throws {Response} 404 error if contact not found
 */
export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.id);
  if (!contact) {
    throw new Response("Contact not found", { status: 404 });
  }
  return { contact };
}

/**
 * Action function to handle form submission and contact updates
 * @async
 * @param {Object} args - Action arguments
 * @param {Request} args.request - Request object containing form data
 * @param {Object} args.params - URL parameters
 * @returns {Promise<Response>} Redirect response after successful update
 */
export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.id, updates);
  return redirect(`/contacts/${params.id}`);
};

/**
 * Edit Contact Form Component
 * Provides interface for editing contact information and uploading avatar
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.loaderData - Data from the loader function
 * @returns {JSX.Element} Edit contact form
 */
export default function EditContact({ loaderData }: Route.ComponentProps) {
  const navigator = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { contact } = loaderData && loaderData;

  const [avatarPreview, setAvatarPreview] = useState(contact?.avatar || "");

  /**
   * Handles file selection for avatar upload
   * Converts selected image to base64 string for preview and storage
   * @param {React.ChangeEvent<HTMLInputElement>} event - File input change event
   */
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <Form
      key={contact.id}
      id="contact-form"
      method="post"
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 flex-row items-center">
          <div className=" w-1/6">First name</div>
          <input
            className="border border-gray-400 rounded-md w-3/4 ring-0 outline-none p-2 py-1"
            aria-label="First name"
            defaultValue={contact.first}
            name="first"
            placeholder="First"
            type="text"
          />
        </div>
        <div className="flex gap-2 flex-row items-center">
          <div className=" w-1/6">Last name</div>
          <input
            className="border border-gray-400 rounded-md w-3/4 ring-0 outline-none p-2 py-1"
            aria-label="Last name"
            defaultValue={contact.last}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <div className="flex gap-2 flex-row items-center">
          <div className=" w-1/6">Twitter</div>
          <input
            className="border border-gray-400 rounded-md w-3/4 ring-0 outline-none p-2 py-1"
            defaultValue={contact.twitter}
            name="twitter"
            placeholder="@jack"
            type="text"
          />
        </div>
        <div className="flex gap-2 flex-col items-start">
          <div className="w-1/6">Avatar</div>
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="w-24 h-24 object-cover rounded-md mb-2"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <input type="hidden" name="avatar" value={avatarPreview} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            Choose Image
          </button>
        </div>
        <div className="flex gap-2 flex-col">
          <div className=" w-1/6">Notes</div>
          <textarea
            defaultValue={contact.notes}
            name="notes"
            rows={6}
            className="border border-gray-300 rounded-md p-2 py-1 ring-0 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => navigator(-1)}
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
}

/**
 * Error Boundary Component
 * Handles and displays errors that occur during route rendering
 * @component
 * @returns {JSX.Element} Error display component
 */

export function ErrorBoundary() {
  const error = useRouteError();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error((error as any)?.data);

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <h1 className="text-xl font-bold text-red-800">Error!</h1>
      <p className="text-red-700">
        {isRouteErrorResponse(error)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            `${error.statusText || (error as any)?.data}`
          : error instanceof Error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error.message || (error as any)?.data
          : "Unknown Error"}
      </p>
    </div>
  );
}
