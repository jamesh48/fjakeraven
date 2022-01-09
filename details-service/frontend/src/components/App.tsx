import React from "react";
import axios from "axios";
import ProductDetails from "./ProductSections/ProductDetails";
import ProductFeatures from "./ProductSections/ProductFeatures/ProductFeatures";
import ProductDescription from "./ProductSections/ProductDescription";
import MaterialSpecification from "./ProductSections/MaterialSpecification";
import TechnicalDetails from "./ProductSections/TechnicalDetails";
import CareInstructions from "./ProductSections/CareInstructions";
import style from "../styles/app.scss";

const App: React.FC<{}> = () => {
  const [details, setDetails] = React.useState({
    product_details: "",
    product_features: ["Section Loading..."],
    product_description: [[{ product_description: "Section Loading..." }]],
    material_specification: [{ section: "Loading..." }],
    technical_details: [[{ section: "Loading..." }]],
    care_instructions: [[{ section: "Loading..." }]]
  });

  React.useEffect(() => {
    const getProduct = async function () {
      const productId =
        window.location.href
          .split("/")
          .filter((item) => {
            return Number(item);
          })
          .join("") || 1;
      const results = await axios(`/details/${productId}`, {
        params: { indicator: "all", service: "details" }
      });
      setDetails(results.data);
    };

    getProduct();
  }, []);

  const {
    product_details,
    product_features,
    product_description,
    material_specification,
    technical_details,
    care_instructions
  } = details;

  let descriptor;
  if (product_description) {
    descriptor = Object.values(product_description[0]).join("");
  }
  {
    return descriptor !== undefined ? (
      <div id={style.productFeatures}>
        <ProductDetails currentComponentDetails={product_details} style={style} />
        <ProductFeatures currentComponentDetails={product_features} style={style} />
        <ProductDescription currentComponentDetails={product_description} style={style} />
        <MaterialSpecification
          currentComponentDetails={material_specification}
          style={style}
        />
        <TechnicalDetails currentComponentDetails={technical_details} style={style} />
        <CareInstructions currentComponentDetails={care_instructions} style={style} />
      </div>
    ) : (
      <div>Product Details is not available</div>
    );
  }
};
export default App;
