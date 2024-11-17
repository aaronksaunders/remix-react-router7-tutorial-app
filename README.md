# Remix, React Router v7 Contact Management Application

A modern contact management application built with Remix, React Router v7, and TypeScript based on the tutorial in the Remix Documentation. Features contact creation, editing, deletion, and avatar management with SQLite storage.

<img src="https://raw.githubusercontent.com/aaronksaunders/remix-react-router7-tutorial-app/refs/heads/main/app/screenshot.png" alt="Screenshot of the application" width="600">

## 🚀 Features

- **Contact Management**: Create, read, update, and delete contacts
- **Avatar Support**: Upload and manage contact avatars
- **Favorites**: Mark contacts as favorites
- **Real-time Search**: Search through contacts
- **Database Storage**: Persistent storage using SQLite
- **Modern UI**: Clean interface built with Tailwind CSS

## 📦 Tech Stack

- **Framework**: [Remix](https://remix.run)
- **Routing**: [React Router v7 (Pre-release)](https://reactrouter.com/dev/home)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Database**: SQLite (via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3))
- **Language**: TypeScript
- **Image Handling**: Base64 encoding for avatar storage

## 🏗️ Project Structure

```
contact-manager/
├── app/
│   ├── routes/                 # Application routes
│   │   ├── index.tsx          # Home page
│   │   ├── contact-details.tsx # Contact details view
│   │   ├── edit-contact.tsx   # Contact editing form
│   │   └── delete-contact.tsx # Contact deletion handler
│   ├── server/                # Server-side operations
│   │   └── index.ts          # Database operations
│   ├── components/            # Reusable components
│   ├── styles/               # CSS and styling
│   └── root.tsx              # Root layout
├── public/                   # Static assets
└── build/                   # Production build
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 💻 Development

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- SQLite

### Environment Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run type checking
- `npm run lint` - Run ESLint

## 📝 API Documentation

### Contact Object Structure

```typescript
interface Contact {
  id: number;
  first: string;
  last: string;
  twitter: string;
  notes: string;
  favorite: boolean;
  avatar: string; // Base64 encoded image
}
```

### Routes

- `/` - Home page with contact list
- `/contacts/:id` - View contact details
- `/contacts/:id/edit` - Edit contact
- `/contacts/:id/delete` - Delete contact

## 🔒 Security Considerations

- Avatar uploads are size-limited and validated
- SQL injection protection via prepared statements
- Input sanitization on all form submissions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Router team for v7 pre-release
- Remix team for the framework
- SQLite team for the database
- All contributors and users

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
