import * as fp from "fastify-plugin";

export default fp(async (server, opts, next) => {
  server.route({
    url: "/error-thrower",
    method: ["GET"],
    handler: async (request, reply) => {
      throw new Error("Oh no! Something bad has happened. Try debugging me!!");
      return reply.send({ date: new Date(), works: true }); //Will never be called :?
    }
  });

  next();
});
