import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProductDetailAttributes {
  id: number;
  product_details: string;
}

export interface ProductDetailsModel
  extends Model<ProductDetailAttributes>,
    ProductDetailAttributes {}

export class ProductDetails extends Model<ProductDetailsModel, ProductDetailAttributes> {}

export type ProductDetailsStatic = typeof Model & { associate: (models: any) => void } & {
  new (values?: object, options?: BuildOptions): ProductDetailsModel;
};

export function ProductDetailsFactory(sequelize: Sequelize): ProductDetailsStatic {
  const ProductDetails = <ProductDetailsStatic>sequelize.define("product_details", {
    product_details: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });

  ProductDetails.associate = function (models) {
    ProductDetails.hasOne(models.ProductFeatures, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    ProductDetails.hasOne(models.ProductDescription, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    ProductDetails.hasOne(models.MaterialSpecification, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    ProductDetails.hasOne(models.TechnicalDetails, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    ProductDetails.hasOne(models.CareInstructions, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return ProductDetails;
}
