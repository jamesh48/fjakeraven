import React from "react";

const ProductDetails: React.FC<{
  currentComponentDetails: string;
  style: any;
}> = ({ style, currentComponentDetails }) => {
  return currentComponentDetails ? (
    <div className={style.teaserRoot}>
      <span className={style.featuresTitle}>Details</span>
      <span className={style.shortDescription}>{currentComponentDetails}</span>
    </div>
  ) : null;
};

export default ProductDetails;
