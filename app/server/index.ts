/**
 * @fileoverview Server-side Database Operations
 * Handles all SQLite database operations for the contacts application.
 * Includes CRUD operations and data type conversions between SQLite and JavaScript.
 * @module server/index
 */

import Database from "better-sqlite3";

/**
 * Database connection instance
 * Initializes connection to SQLite database with logging enabled
 * @constant {Database}
 */
const db = new Database('database.sqlite', { verbose: console.log });

/**
 * Initialize database schema
 * Creates the contacts table if it doesn't exist
 * @description Schema includes fields for personal info, social media, and avatar storage
 */
db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first TEXT NOT NULL,
      last TEXT NOT NULL,
      twitter TEXT NOT NULL,
      notes TEXT NOT NULL,
      favorite INTEGER NOT NULL,
      avatar TEXT NOT NULL
    )
`);

/**
 * Contact Interface
 * @interface Contact
 * @property {number} id - Unique identifier for the contact
 * @property {string} first - First name
 * @property {string} last - Last name
 * @property {string} twitter - Twitter handle
 * @property {string} notes - Additional notes about the contact
 * @property {boolean} favorite - Whether the contact is favorited (stored as INTEGER in SQLite)
 * @property {string} avatar - Base64 encoded image string for contact's avatar
 */
export interface Contact {
    id: number;
    first: string;
    last: string;
    twitter: string;
    notes: string;
    favorite: boolean;
    avatar: string;
}

/**
 * Creates a new empty contact
 * @async
 * @returns {Promise<Contact>} Newly created contact with default values
 * @description Initializes a new contact with placeholder values and converts data types for SQLite storage
 */
export const createEmptyContact = async () => {
    const contact = {
        id: 0,
        first: "New",
        last: "Contact",
        twitter: "",
        notes: "",
        favorite: 0,
        avatar: "",
    };

    const result = db
        .prepare("INSERT INTO contacts (first, last, twitter, notes, favorite, avatar) VALUES (?, ?, ?, ?, ?, ?)")
        .run(contact.first, contact.last, contact.twitter, contact.notes, contact.favorite, contact.avatar);

    return {
        ...contact,
        id: result.lastInsertRowid,
        favorite: !!contact.favorite,
    };
};

/**
 * Retrieves a contact by ID
 * @async
 * @param {string} id - Contact ID to retrieve
 * @returns {Promise<Contact|null>} Contact if found, null otherwise
 * @description Converts SQLite INTEGER favorite field to JavaScript boolean
 */
export const getContact = async (id: string) => {
    const result = db
        .prepare("SELECT * FROM contacts WHERE id = ?")
        .get(id) as Contact | undefined;

    if (!result) {
        return null;
    }

    return {
        ...result,
        favorite: !!result?.favorite,
    };
};

/**
 * Deletes a contact
 * @async
 * @param {string} id - Contact ID to delete
 * @returns {Promise<any>} Result of the delete operation
 */
export const deleteContact = async (id: string) => {
    const result = db.prepare("DELETE FROM contacts WHERE id = ?").run(id);
    return result;
};

/**
 * Retrieves all contacts
 * @async
 * @returns {Promise<Contact[]>} Array of all contacts
 * @description Converts SQLite INTEGER favorite fields to JavaScript booleans
 * @throws {Error} If database query fails
 */
export const getSomeContactData = async () => {
    try {
        const result = db
            .prepare("SELECT * FROM contacts")
            .all() as Contact[];

        console.log("result", result);
        return result.map((contact) => ({
            ...contact,
            favorite: !!contact.favorite,
        }));
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

/**
 * Updates a contact
 * @async
 * @param {string} id - Contact ID to update
 * @param {Partial<Contact>} updates - Object containing fields to update
 * @returns {Promise<any>} Result of the update operation
 * @description
 * Uses COALESCE to only update provided fields while preserving existing values.
 * Handles data type conversion between JavaScript and SQLite:
 * - JavaScript boolean to SQLite INTEGER for favorite field
 * - Preserves existing values for undefined fields
 */
export const updateContact = async (id: string, updates: Partial<Contact>) => {
    const result = db
        .prepare(`
            UPDATE contacts 
            SET 
                first = COALESCE(@first, first),
                last = COALESCE(@last, last),
                twitter = COALESCE(@twitter, twitter),
                notes = COALESCE(@notes, notes),
                favorite = COALESCE(@favorite, favorite),
                avatar = COALESCE(@avatar, avatar)
            WHERE id = @id
        `)
        .run({
            first: updates.first,
            last: updates.last,
            twitter: updates.twitter,
            notes: updates.notes,
            favorite: updates.favorite ? 1 : 0,
            avatar: updates.avatar,
            id
        });
    return result;
};
