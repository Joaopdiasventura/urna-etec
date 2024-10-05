import { Module } from '@nestjs/common';
import { VoteGateway } from './vote/vote.gateway';

@Module({
  exports: [VoteGateway],
  providers: [VoteGateway]
})
export class WebsocketsModule {}
