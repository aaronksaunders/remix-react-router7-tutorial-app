/**
 * @fileoverview Application Routes Configuration
 * Defines the routing structure for the entire application.
 * Uses React Router's file-based routing system with explicit route definitions.
 * @module app/routes
 */

import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

/**
 * Application routes configuration
 * @constant {RouteConfig}
 * @description Defines all available routes in the application:
 * - Index (/) - Home page
 * - About (/about) - About page
 * - Contact Details (/contacts/:id) - Individual contact view
 * - Edit Contact (/contacts/:id/edit) - Contact editing form
 * - Delete Contact (/contacts/:id/delete) - Contact deletion handler
 * 
 * @example
 * // URL structure examples:
 * // / -> Home page
 * // /about -> About page
 * // /contacts/123 -> Details for contact ID 123
 * // /contacts/123/edit -> Edit form for contact ID 123
 * // /contacts/123/delete -> Delete handler for contact ID 123
 */
export const routes: RouteConfig = [
    // Home page route
    index("routes/index.tsx"),

    // Static pages
    route("/about", "routes/about.tsx"),

    // Contact-related routes
    route("/contacts/:id", "routes/contact-details.tsx"),
    route("/contacts/:id/edit", "routes/edit-contact.tsx"),
    route("/contacts/:id/delete", "routes/delete-contact.tsx"),
];

