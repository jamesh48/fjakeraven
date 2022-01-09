import React from "react";

const ProductDescription: React.FC<{
  style: any;
  currentComponentDetails: { product_description: string }[][];
}> = (props) => {
  const { style, currentComponentDetails } = props;

  const {
    teaserRoot,
    productDescription,
    descriptionRoot,
    descriptionTitle,
    descriptionContent,
    description,
    descriptionText,
    descriptionSpec,
    descriptionItem,
    descriptionItemLabel
  } = style;

  return currentComponentDetails !== undefined ? (
    <div id={productDescription} className={`${teaserRoot} ${descriptionRoot}`}>
      <span className={descriptionTitle}>Product Description</span>
      <div className={descriptionContent}>
        <div className={description}>
          <p className={descriptionText}>
            <span className={descriptionItem}>
              {currentComponentDetails[0][0].product_description}
              <br />
            </span>
          </p>
        </div>

        <div className={descriptionSpec}>
          <p className={descriptionText}>
            {currentComponentDetails[1]?.map((item, index) => {
              const value = Object.values(item)[0];
              let title = Object.keys(item)[0];
              if (title !== undefined) {
                title = title.replace(/_/g, " ");
                title = `${title[0].toUpperCase()}${title.slice(1)}: `;
              }
              return value !== undefined ? (
                <span key={index} className={descriptionItem}>
                  <strong className={descriptionItemLabel}>{`${title}`}</strong>
                  {value}
                  <br />
                </span>
              ) : null;
            })}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductDescription;
