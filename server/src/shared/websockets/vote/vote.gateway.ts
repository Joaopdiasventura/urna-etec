import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Vote } from "src/domain/vote/entities/vote.entity";

@WebSocketGateway()
export class VoteGateway {
    @WebSocketServer()
    server: Server;

    broadcastVoteCreated(vote: Vote) {
        this.server.emit("voteCreated", vote);
    }
}
