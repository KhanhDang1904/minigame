const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for testing
        methods: ["GET", "POST"],
    },
});
const group = {}

// Handle Socket.IO connections
io.on("connection", (socket) => {

    console.log("A user connect:", socket.id);
    socket.on("start", (groupName) => {
        //time_end = new Date().getTime() + 1000 * 60 * 60 * 24
        group[socket.id] = {
            groupName: groupName,
            time_end: new Date().getTime() + 1000 * 60 * 3,
            socket_id: socket.id,
            nodes: null,
            result: null,
            point: 0
        }
        socket.emit("start", group[socket.id])
    });
    socket.on("submit", (data) => {
        //time_end = new Date().getTime() + 1000 * 60 * 60 * 24
        $data = JSON.parse(data)
        $data.point = getPoint($data)
        group[$data.socket_id] = $data
        socket.emit("submit", $data)
        console.log(group)
    });
    socket.on("result", (data) => {
        socket.emit("result", group)
    });
    // Handle disconnections
    socket.on("disconnect", () => {

    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});
function getPoint(data) {

    return 10;
}