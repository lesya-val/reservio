import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
    credentials: true,
  },
})

export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log("WebSocket server is initialized");
  }

  handleConnection(client: Socket) {
    const { restaurantId } = client.handshake.query;

    if (!restaurantId) {
      client.disconnect();
      return;
    }

    // Присоединяем клиента к комнате ресторана
    client.join(`restaurant_${restaurantId}`);
  }

  handleDisconnect(client: Socket) {
    const { restaurantId } = client.handshake.query;
    if (restaurantId) {
      client.leave(`restaurant_${restaurantId}`);
    }
  }
}
