import config from "../config";
import socketio from "socket.io-client";

const API_URL = config.API_URL;

const SOCKET_URL = API_URL;
export const socket = socketio.connect(SOCKET_URL);
