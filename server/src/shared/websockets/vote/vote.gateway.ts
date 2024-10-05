import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Vote } from 'src/domain/vote/entities/vote.entity';

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
  }

  broadcastVoteCreated(vote: Vote) {
    this.server.emit('voteCreated', vote);
  }
}
