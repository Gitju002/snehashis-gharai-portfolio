import Image from "next/image";
import React from "react";

const ExploreCard = () => {
  return (
    <div className="explore-card-container">
      <div className="explore-card-content">
        <div className="explore-card-image-wrapper">
          <Image
            src="/images/zoom-parallax-6.webp"
            alt="Explore"
            placeholder="blur"
            blurDataURL="/images/blurred-preview.jpg"
            width={1000}
            height={600}
            className="size-full object-center object-cover bg-no-repeat explore-card-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
