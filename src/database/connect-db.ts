import type { IDatabase } from "./interfaces/database.interface.js";

export class ConnectDB implements IDatabase {
  private static instance: ConnectDB;

  constructor(private conectionDB: IDatabase){}

  public static getInstance(conectionDB: IDatabase): ConnectDB {
    if (!ConnectDB.instance) {
      ConnectDB.instance = new ConnectDB(conectionDB);
    }

    return ConnectDB.instance;
  }

  public async connect(): Promise<void> {
    return this.conectionDB.connect();
  }

  public async disconnect(): Promise<void> {
    return this.conectionDB.disconnect();
  }
}