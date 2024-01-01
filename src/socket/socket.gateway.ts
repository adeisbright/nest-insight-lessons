import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server; //Provides access to the Platform server gateway

  handleConnection(client: Socket) {
    this.authenticateSocket(client);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any): WsResponse<unknown> {
    console.log(data);

    const event = 'test';
    const respnseMessage = {
      name: 'Adeleke Bright',
      age: 29,
    };
    return { event, data: respnseMessage };
  }

  authenticateSocket(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (client.handshake.query && token) {
        console.log(`The token is : ${token}`);
        return;
      }
      throw new WsException('No authentication provided');
    } catch (error) {
      client.emit('authentication_failed', {
        message: 'Authentication Failed during Processing',
      });
      return error;
    }
  }
}
