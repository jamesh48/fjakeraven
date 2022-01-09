import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProductDescriptionAttributes {
  id: number;
  product_description: string;
  article_number: string;
  activity: string;
  family: string;
  gender: string;
  environmental_information: string;
  features: string;
}

export interface ProductDescriptionModel
  extends Model<ProductDescriptionAttributes>,
    ProductDescriptionAttributes {}

export class ProductDescription extends Model<
  ProductDescriptionModel,
  ProductDescriptionAttributes
> {}

export type ProductDescriptionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductDescriptionModel;
};

export function ProductDescriptionFactory(
  sequelize: Sequelize
): ProductDescriptionStatic {
  return <ProductDescriptionStatic>sequelize.define("product_descriptions", {
    product_description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    article_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    family: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    environmental_information: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    features: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });
}
