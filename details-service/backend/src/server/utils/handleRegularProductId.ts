import { RequestHandler } from "express";
import path from "path";
import { ParamTypes, QueryTypes, Section } from "../serverTypes";
import accessUtils from "../../database/controllers";
const { getActivity, getAll } = accessUtils;

export const handleRegularProductId: RequestHandler<
  ParamTypes,
  unknown,
  unknown,
  QueryTypes
> = async (req, res) => {
  // This first condition is for local development only.
  if (!req.query.indicator) {
    res.sendFile(path.resolve("client/dist/index.html"));
  } else if (/activity/g.test(req.query.indicator)) {
    try {
      const result = await getActivity(req.params.productId);
      res.json({ activity: result.activity });
    } catch (err) {
      /Cannot read property 'dataValues' of null/gm.test(err.message)
        ? res.status(404).send(`Product Not Found!`)
        : res.status(500).send("Internal Server Error");
    }
  } else {
    try {
      let {
        product_details,
        product_description: { dataValues: descriptors },
        product_feature: { dataValues: product_feature },
        material_specification: { dataValues: materialSpecs },
        technical_detail: { dataValues: technicalDetails },
        care_instruction: { dataValues: careDetails }
      } = await getAll(req.params.productId);

      const filteredHelperMap = (section: Section) => {
        return Object.entries(section)
          .filter((item) => {
            return item[0] !== "id" && item[0] !== "createdAt" && item[0] !== "updatedAt"
              ? item
              : null;
          })
          .map((thing) => {
            return /feature/g.test(thing[0]) ? thing[1] : { [thing[0]]: thing[1] };
          });
      };
      const filteredHelperReduce = (
        section: Section,
        regex: RegExp,
        indicator?: boolean
      ) => {
        return Object.entries(section)
          .filter((item) => {
            return !/(id)|(atedAt)/g.test(item[0]);
          })
          .reduce(
            (total: any[][], item, index) => {
              const [key, value] = item;
              !regex.test(key) || (indicator && index < 3)
                ? // left div
                  (total[0] = [...total[0], { [key]: value }])
                : // right div
                  (total[1] = [...total[1], { [key]: value }]);
              return total;
            },
            [[], []]
          );
      };

      const featureArr = filteredHelperMap(product_feature);
      const descriptorArr = filteredHelperReduce(
        descriptors,
        /^(?!product_description)/g
      );
      const materialArr = filteredHelperMap(materialSpecs);
      const technicalArr = filteredHelperReduce(
        technicalDetails,
        /^(?!model_size)/g,
        true
      );
      const careArr = filteredHelperReduce(careDetails, /additional_care_instructions/);
      console.info(`Sending data from /${req.params.productId}`);
      res.json({
        product_details: product_details,
        product_features: featureArr,
        product_description: descriptorArr,
        material_specification: materialArr,
        technical_details: technicalArr,
        care_instructions: careArr
      });
    } catch (err) {
      console.log(err);
      /Cannot read property 'dataValues' of null/gm.test(err.message)
        ? res.status(404).send(`Product Not Found!`)
        : res.status(500).send("Internal Server Error");
    }
  }
};
