import React from "react";

const MaterialSpecification: React.FC<{
  style: any;
  currentComponentDetails: {}[];
}> = ({
  style: {
    teaserRoot,
    descriptionRoot,
    materialSpecification,
    descriptionTitle,
    descriptionContent,
    description,
    descriptionText,
    descriptionItem,
    descriptionItemLabel
  },
  currentComponentDetails
}) => {
  return (
    <div id={materialSpecification} className={`${teaserRoot} ${descriptionRoot}`}>
      <span className={descriptionTitle}>Material Specification</span>
      <div className={descriptionContent}>
        <div className={description}>
          <p className={descriptionText}>
            {currentComponentDetails.map((item, index) => {
              const [value] = Object.values(item);
              let [title] = Object.keys(item);
              if (title !== undefined) {
                title = title.replace(/_/g, " ");
                title = `${title[0].toUpperCase()}${title.slice(1)}: `;
              }
              return (
                value && (
                  <span key={index} className={descriptionItem}>
                    <strong className={descriptionItemLabel}>{`${title}`}</strong>
                    {value}
                    <br />
                  </span>
                )
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaterialSpecification;
