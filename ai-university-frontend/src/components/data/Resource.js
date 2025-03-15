import React from "react";

const Resource = ({ title, mediaLink }) => {
  if (!mediaLink) {
    console.error("❌ Missing mediaLink for resource:", title);
    return null;
  }

  const isPDF = mediaLink.endsWith(".pdf");

  return (
    <div className="resource">
      <h3>{title}</h3>
      {isPDF ? (
        <iframe src={mediaLink} width="100%" height="500px" title={title}></iframe>
      ) : (
        <iframe
          width="100%"
          height="315"
          src={mediaLink}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Resource;
