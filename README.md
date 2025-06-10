# Chat Room MVP Project

This project is a simple chat room application built using React and Tailwind CSS for the frontend, and Node.js, Express.js, and Socket.IO for the backend.

## Project Structure

```text
chatroom-socketio
├── client
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── ChatRoom.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── UserList.tsx
│   │   ├── hooks
│   │   │   └── useSocket.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── controllers
│   │   │   └── chatController.ts
│   │   ├── middleware
│   │   │   └── auth.ts
│   │   ├── models
│   │   │   └── Message.ts
│   │   ├── routes
│   │   │   └── chat.ts
│   │   ├── socket
│   │   │   └── socketHandlers.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chatroom-socketio
   ```

2. Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Navigate to the server directory and install dependencies:

   ```bash
   cd ../server
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

1. Start the server:

   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the client:

   ```bash
   cd client
   npm start
   ```

3. Open your browser and go to `http://localhost:3000` to access the chat room.

### Features

- Real-time messaging using Socket.IO
- User list display
- Message input field
- Responsive design with Tailwind CSS

### Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

### License

This project is licensed under the MIT License.
