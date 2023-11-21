# Basic Chat Application

This is a straightforward chat application where multiple users can connect to a single room and communicate in real-time. It's built using React for the frontend, Node.js, and Socket.IO for the backend.

## Features

- **Real-time Communication:** Users can instantly send and receive messages in the chat room.
- **Single Room Support:** Multiple users can join and communicate within the same room.
- **Simple Interface:** Provides an intuitive and easy-to-use interface for chatting.

## Technologies Used

### Frontend
- React
- Socket.IO Client

### Backend
- Node.js
- Express
- Socket.IO
- CORS (Cross-Origin Resource Sharing) for handling client-side requests

## Installation

### Prerequisites
- Node.js installed
- Yarn package manager

### Steps
1. Clone the repository: `git clone <repository-url>`
2. **Frontend Setup**:
    ```bash
    cd socket
    yarn install
    yarn start
    ```
3. **Backend Setup**:
    ```bash
    cd server
    yarn install
    yarn start
    ```

## Usage

1. Open the application in your web browser.
2. Enter a username and join the chat room.
3. Start communicating with other users in the same room by sending messages.

## Folder Structure

- `socket/`: Contains the React frontend code.
- `server/`: Includes the Node.js backend code.
