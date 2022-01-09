import database from "./config";
const AccessUtils = {
  getAll: async (productId: number) => {
    try {
      const {
        ProductDetails,
        ProductFeatures,
        ProductDescription,
        MaterialSpecification,
        TechnicalDetails,
        CareInstructions
      } = database.models;
      ProductDetails.associate(database.models);

      const results = await ProductDetails.findOne({
        where: { id: productId },
        include: [
          {
            model: ProductDescription
          },
          {
            model: ProductFeatures
          },
          {
            model: MaterialSpecification
          },
          {
            model: TechnicalDetails
          },
          {
            model: CareInstructions
          }
        ]
      });

      // @ts-ignore
      return results.dataValues;
    } catch (err) {
      throw new Error(err);
    }
  },

  getActivity: async (productId: number) => {
    try {
      const { ProductDescription } = database.models;
      const activity = await ProductDescription.findOne({
        where: { id: productId }
      });
      // @ts-ignore
      return activity.dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }
};

export default AccessUtils;
