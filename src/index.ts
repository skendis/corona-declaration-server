import express = require("express");
import mongoose = require("mongoose");
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";

import schema from "./graphql/schema/schema";
import resolvers from "./graphql/resolvers/resolvers";

//if not in production take the env vars from the local .env git ignored file.
// later in production will load the env vars from the hosting company settings directly
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: __dirname + "/.env" });
}

//load mongo db urlfor connection from env var
const MONGO_URL = process.env.MONGO_URL;

//start the app
const start = async () => {
  const app = express();

  //connect to db through mongoose.
  mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  //log when there is an error in connection to db
  mongoose.connection.on("error", (err) => {
    console.log("err", err);
  });

  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
  });

  // Set that when doing an update to employee in mongoose - then the returned employee object
  // will be the updated one, and not the one before the update.
  mongoose.set("returnOriginal", false);

  // create the server and load the schema and resolvers of graphql in it.
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  //set the app api endpoint (only one endpoint for all calls - and connecting trough the graphql query language)
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
};

start();
