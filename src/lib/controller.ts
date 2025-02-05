import { AccessToken } from "@dtelecom/server-sdk-js";

export type Config = {
  api_key: string;
  api_secret: string;
};

export type ConnectionDetails = {
  token: string;
  ws_url: string;
};

export type CreateStreamParams = {
  room_name: string;
  identity: string;
};

export type JoinStreamParams = {
  room_name: string;
  identity: string;
};

export class Controller {

  async createStream({
    identity,
    room_name,
  }: CreateStreamParams, clientIp: string): Promise<ConnectionDetails> {
    const at = new AccessToken(
      process.env.API_KEY,
      process.env.API_SECRET,
      {
        identity,
      }
    );

    at.addGrant({
      room: room_name,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });
    const ws_url = await at.getWsUrl(clientIp);

    const connection_details = {
      ws_url,
      token: at.toJwt(),
    };

    return connection_details;
  }

  async joinStream({
    identity,
    room_name,
  }: JoinStreamParams, clientIp: string): Promise<ConnectionDetails> {
    const at = new AccessToken(
      process.env.API_KEY,
      process.env.API_SECRET,
      {
        identity,
      }
    );

    at.addGrant({
      room: room_name,
      roomJoin: true,
      canPublish: false,
      canSubscribe: true,
      canPublishData: true,
    });

    const ws_url = await at.getWsUrl(clientIp);

    const connection_details = {
      ws_url,
      token: at.toJwt(),
    };

    return connection_details;

  }
}
