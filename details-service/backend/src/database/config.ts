import path from "path";
require("dotenv").config({ path: path.resolve("backend/.env") });
import * as sequelize from "sequelize";

import {
  CareInstructionsFactory,
  CareInstructionStatic,
  MaterialSpecificationFactory,
  MaterialSpecificationStatic,
  ProductDescriptionFactory,
  ProductDescriptionStatic,
  ProductDetailsFactory,
  ProductDetailsStatic,
  ProductFeaturesFactory,
  ProductFeaturesStatic,
  TechnicalDetailsFactory,
  TechnicalDetailsStatic
} from "./modelIndex";

const dbConfig = new sequelize.Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD,
  {
    host: process.env.host,
    dialect: "mysql",
    logging: false
  }
);

const connect = async () => {
  try {
    await dbConfig.authenticate();
    await dbConfig.sync();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error(error.message);
    process.exit(-1);
  }
};

const ProductDetails = ProductDetailsFactory(dbConfig);
const ProductFeatures = ProductFeaturesFactory(dbConfig);
const TechnicalDetails = TechnicalDetailsFactory(dbConfig);
const ProductDescription = ProductDescriptionFactory(dbConfig);
const MaterialSpecification = MaterialSpecificationFactory(dbConfig);
const CareInstructions = CareInstructionsFactory(dbConfig);

const database: {
  sequelize: any;
  models: {
    ProductDetails: ProductDetailsStatic;
    ProductFeatures: ProductFeaturesStatic;
    TechnicalDetails: TechnicalDetailsStatic;
    ProductDescription: ProductDescriptionStatic;
    MaterialSpecification: MaterialSpecificationStatic;
    CareInstructions: CareInstructionStatic;
  };
  connect: () => any;
} = {
  sequelize: sequelize,
  models: {
    ProductDetails,
    ProductFeatures,
    TechnicalDetails,
    ProductDescription,
    MaterialSpecification,
    CareInstructions
  },
  connect
};

export default database;
