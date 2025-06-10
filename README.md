# Chat Room MVP

This project is a simple chat room application built with React, Tailwind CSS, and Socket.IO for the frontend, and Node.js, Express.js, and Socket.IO for the backend.

## Features

- Real-time messaging using Socket.IO
- Responsive design with Tailwind CSS
- User-friendly interface for sending and receiving messages

## Project Structure

``` sh
chat-room-mvp
├── client                # Frontend application
│   ├── src               # Source files for React application
│   │   ├── components     # React components
│   │   ├── App.tsx        # Main application component
│   │   ├── index.tsx      # Entry point for React application
│   │   └── index.css      # Global CSS styles
│   ├── public            # Public assets
│   │   └── index.html     # Main HTML file
│   ├── package.json      # Client-side npm project configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── tsconfig.json     # TypeScript configuration for client
├── server                # Backend application
│   ├── src               # Source files for Node.js application
│   │   ├── app.ts        # Entry point for server application
│   │   ├── routes        # Route definitions
│   │   └── socket        # Socket event handlers
│   ├── package.json      # Server-side npm project configuration
│   └── tsconfig.json     # TypeScript configuration for server
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ``` sh
   git clone https://github.com/yourusername/chat-room-mvp.git
   cd chat-room-mvp
   ```

2. Install dependencies for the client:

   ``` sh
   cd client
   npm install
   ```

3. Install dependencies for the server:

   ``` sh
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:

   ``` sh
   cd server
   npm start
   ```

2. In a new terminal, start the client:

   ``` sh
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the chat room.

## Usage

- Enter your message in the input field and press Enter to send.
- Messages will be displayed in real-time for all connected users.

## License

This project is licensed under the MIT License.
