import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CareInstructionAttributes {
  washing: string;
  dry_cleaning: string;
  bleaching: string;
  drying: string;
  ironing: string;
  additional_care_instructions: string;
}

export interface CareInstructionsModel
  extends Model<CareInstructionAttributes>,
    CareInstructionAttributes {}

export class CareInstruction extends Model<
  CareInstructionsModel,
  CareInstructionAttributes
> {}

export type CareInstructionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CareInstructionsModel;
};

export function CareInstructionsFactory(sequelize: Sequelize): CareInstructionStatic {
  return <CareInstructionStatic>sequelize.define("care_instruction", {
    washing: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    dry_cleaning: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    bleaching: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    drying: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    ironing: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    additional_care_instructions: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  });
}
