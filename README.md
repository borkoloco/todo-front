# Frontend

This is the frontend for the **To-Do List Application**.

## Features
- **Authentication**: Auth0 integration.
- **Task Management**: Create, update, and delete tasks with a user-friendly interface.
- **State Management**: Redux Toolkit for efficient state handling.
- **Styling**: Styled Components for modular styling.

## Tech Stack
- **React**: Frontend library.
- **Next.js**: Framework for server-side rendering.
- **Redux Toolkit**: State management.
- **Styled Components**: CSS-in-JS styling.

## Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **Auth0 Account**: Create an account. [Sign up here](https://auth0.com/).

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/todo-front.git
   cd todo-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following values:
   ```
   NEXT_PUBLIC_AUTH0_CLIENT_ID=your_auth0_client_id
   NEXT_PUBLIC_AUTH0_DOMAIN=your_auth0_domain
   NEXT_PUBLIC_AUTH0_AUDIENCE=your_auth0_audience
   NEXT_PUBLIC_BASE_URL=your_backend_base_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Render
1. Go to [Render](https://render.com/) and log in.
2. Create a new **Web Service**.
3. Connect the `todo-front` GitHub repository.
4. Configure the service:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment Variables**:
     - Add the variables from your `.env.local` file.
5. Deploy the service.
6. Once deployed, your frontend will be accessible at the provided URL (e.g., `https://todo-front.onrender.com`).

## Usage
1. Navigate to the deployed frontend URL.
2. Log in using the **Auth0** login button.
3. Manage your tasks:
   - Add tasks.
   - Update task details.
   - Delete tasks.

## Testing
Run frontend tests:
```bash
npm test
```

## License
This project is licensed under the MIT License.
