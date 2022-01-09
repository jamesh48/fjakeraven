import React from "react";
import ProductFeaturesCarousel from "./ProductFeaturesCarousel";

const ProductFeatures: React.FC<{
  currentComponentDetails: {}[];
  style: any;
}> = (props) => {
  const { currentComponentDetails, style } = props;
  return currentComponentDetails ? (
    <div className={`${style.teaserRoot} ${style.featuresRoot}`}>
      <div className={style.featuresDescription}>
        <div>
          <span className={style.featuresTitle}>Product Features</span>
          <ul className={style.features}>
            {currentComponentDetails.map((feature, index) => {
              return feature && (
                <li key={index} className={style.featuresLi}>
                  {feature}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <ProductFeaturesCarousel style={style} />
    </div>
  ) : null;
};

export default ProductFeatures;
