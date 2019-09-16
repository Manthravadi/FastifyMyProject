import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { VehicleModel, Vehicle } from "./models/vehicle";
import * as fp from "fastify-plugin";

export interface Models {
  Vehicle: Model<VehicleModel>;
}

export interface Db {
  models: Models;
}

export default fp(async (fastify, opts: { uri: string }, next) => {
  Mongoose.connection.on("connected", () => {
    fastify.log.info({ actor: "MongoDB" }, "Connected");
  });

  Mongoose.connecttion.on("disconnected", () => {
    fastify.log.error({ actor: "MongoDB" }, "Disconnected");
  });

  await Mongoose.connect(opts.uri, { useNewUrlParse: true, keepAlive: 1 });

  const models: Models = {
    Vehicle: Vehicle
  };

  fastify.decorate("db", { models });

  next();
});
