import React from "react";
const CareInstructions: React.FC<{
  style: any;
  currentComponentDetails: {}[][];
}> = (props) => {
  const { style, currentComponentDetails } = props;
  const {
    teaserRoot,
    descriptionRoot,
    descriptionTitle,
    descriptionContent,
    description,
    descriptionText,
    descriptionSpec,
    descriptionItem,
    descriptionItemLabel
  } = style;
  return (
    <div className={`${teaserRoot} ${descriptionRoot}`}>
      <span className={descriptionTitle}>Care Instructions</span>
      <div className={descriptionContent}>
        <div className={description}>
          <p className={descriptionText}>
            {currentComponentDetails[0].map((item: {}, index) => {
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
  );
};

export default CareInstructions;
