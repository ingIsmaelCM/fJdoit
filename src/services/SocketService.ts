import {io, Socket} from "socket.io-client";
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

export default class SocketService {
    private static instance: SocketService;
    private socketIo: Socket;

    private constructor() {
        this.socketIo = io(socketUrl, {
            path: "/api/socket",
        });
        this.socketIo.connect();
        SocketService.instance = this;
    }

    static getInstance() {
        if (!SocketService.instance) {
            new SocketService();
        }
        return SocketService.instance;
    }

    sendToChannel(
        channel: string,
        data: any,
        options?: SocketOptions,
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
        this.socketIo.on(channel+"-"+useUserStore().getUser.id, (msg: any) => {
            if (!cb) {
                return () => {
                };
            }
            return cb(msg)
        });
    }
}
