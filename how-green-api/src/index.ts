import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createConnection } from "typeorm";
import { routes } from "./routes/routes";

createConnection().then(() => {
  const swaggerOptions: OAS3Options = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: "How Green API",
        description: "An app for calculating your household energy class.",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:8080/api",
          description: "Development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    apis: ["**/*.ts"],
  };

  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:8081", "http://localhost:4200"],
      credentials: true,
    })
  );

  routes(app);

  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.listen(8080, () => {
    console.log("listening to port 8080");
  });
});
