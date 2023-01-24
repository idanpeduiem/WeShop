import {WebSocketServer} from "ws";

export const createWebSocket = () => {
    const {WEB_SOCKET_PORT = 1000} = process.env;

    const ws = new WebSocketServer({
        port: Number(WEB_SOCKET_PORT)
    });

    ws.on('connection', (ws, request) => {
        console.log(`user connected: ${request.url}`);
        ws.on("close", () => {
            console.log("Client disconnected");
        });
        ws.onerror = function () {
            console.log("Some Error occurred");
        }

        ws.emit("helo", 123)
    })

    return ws
}

// export const wsManager = createWebSocket();
