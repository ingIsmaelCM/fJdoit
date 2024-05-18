import {io} from "socket.io-client";
import useUserStore from "@/stores/userStore";

const socketUrl = import.meta.env.DEV
    ? import.meta.env.VITE_DEV_SOCKET_URL
    : import.meta.env.VITE_SOCKET_URL;

export interface SocketOptions {
    from: number;
    to: number | "*" | "authenticated";
    permissions?: string | string[];
    roles?: string | string[];
}

export default class Socket {
    private static instance: Socket;
    private socketIo: any;

    private constructor() {
        this.socketIo = io(socketUrl, {
            path: "/api/socket",
        });
        this.socketIo.connect();
        Socket.instance = this;
    }

    static getInstance() {
        if (!Socket.instance) {
            new Socket();
        }
        return Socket.instance;
    }

    sendToChannel(
        channel: string,
        data: any,
        options: SocketOptions,
        cb?: Function
    ) {
        const content = {
            auth: useUserStore().getUser,
            options: options,
            data: data,
        };
        this.socketIo.emit(channel, content, cb);
    }

    getFromChannel(channel: string, cb?: Function) {
        this.socketIo.off(channel).on(channel, (msg: any) => {
            if (!cb) {
                return ()=>{};
            }
            return cb(msg)
        });
    }
}
