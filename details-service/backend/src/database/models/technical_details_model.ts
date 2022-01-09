import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface TechnicalDetailsAttributes {
  weight: string;
  weight_reference: string;
  model_height: string;
  model_size: string;
  sleeve_type: string;
  number_of_pockets: number;
  pockets: string;
}

export interface TechnicalDetailsModel
  extends Model<TechnicalDetailsAttributes>,
    TechnicalDetailsAttributes {}

export class TechnicalDetails extends Model<
  TechnicalDetailsModel,
  TechnicalDetailsAttributes
> {}

export type TechnicalDetailsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TechnicalDetailsModel;
};

export function TechnicalDetailsFactory(sequelize: Sequelize): TechnicalDetailsStatic {
  return <TechnicalDetailsStatic>sequelize.define("technical_details", {
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    weight_reference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    model_height: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    model_size: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    sleeve_type: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    number_of_pockets: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    },
    pockets: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });
}