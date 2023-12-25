import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACK_URL;

console.log(URL);

export const socket = io(URL);
