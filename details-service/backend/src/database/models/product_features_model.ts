import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProductFeatureAttributes {
  featureOne: string;
  featureTwo: string;
  featureThree: string;
  featureFour: string;
  featureFive: string;
  featureSix: string;
}

export interface ProductFeaturesModel
  extends Model<ProductFeatureAttributes>,
    ProductFeatureAttributes {}

export class ProductFeatures extends Model<
  ProductFeaturesModel,
  ProductFeatureAttributes
> {}

export type ProductFeaturesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductFeaturesModel;
};

export function ProductFeaturesFactory(sequelize: Sequelize) {
  return <ProductFeaturesStatic>sequelize.define("product_features", {
    featureOne: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    featureTwo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    featureThree: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    featureFour: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    featureFive: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    featureSix: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });
}
