# iNoteBook

## description
A full-stack notes management application demonstrating user authentication, frontend state management, and RESTful API integration.

## structure
- Frontend: React with Context API for global state.
- Backend: Node.js with Express.js.
- Database: MongoDB (NoSQL).

## features
- User login/signup with token-based auth.
- CRUD operations on user notes.
- Real-time note updates using Context API.
- Mobile-responsive UI.
- Private user data isolation via token auth.

## assumptions
- Single-page app (SPA) with protected routes.
- Each user can manage only their own notes.
- No WYSIWYG editor — plain text notes only.
- Notes are not encrypted end-to-end (basic security only).

## usage
Clone the repo and run the following commands:

### Frontend

```bash
cd inotebook
npm install
npm start

## 🔗 Backend Source Code

See: [Backend Folder](./Backend)


GOALS
Practice full-stack development.

Implement JWT authentication.

Manage global state without Redux.

Use RESTful principles in backend API design.

CONTROLS
Add/edit/delete notes from the dashboard.

Login to access your personal note space.

Logout to clear session (JWT token).


FUTURE IMPROVEMENTS
Add tags or search functionality.

Convert to TypeScript.

Deploy frontend and backend on separate hosting (e.g., Vercel + Render).

Add user profile settings.



## author
Aashish Yadav – [LinkedIn](https://www.linkedin.com/in/aashish-yadav-b3258a261)
