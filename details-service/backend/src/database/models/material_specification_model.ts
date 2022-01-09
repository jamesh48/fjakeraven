import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface MaterialSpecificationAttributes {
  material: string;
  lining: string;
  filling: string;
  legal_notice: string;
}

export interface MaterialSpecificationModel
  extends Model<MaterialSpecificationAttributes>,
    MaterialSpecificationAttributes {}

export class MaterialSpecification extends Model<
  MaterialSpecificationModel,
  MaterialSpecificationAttributes
> {}

export type MaterialSpecificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MaterialSpecificationModel;
};

export function MaterialSpecificationFactory(
  sequelize: Sequelize
): MaterialSpecificationStatic {
  return <MaterialSpecificationStatic>sequelize.define("material_specifications", {
    material: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    lining: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    filling: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    legal_notice: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });
}
