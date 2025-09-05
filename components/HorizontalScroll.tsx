import React from "react";
import VStack from "./layout/VStack";
import ExploreCard from "./ExploreCard";
import Image from "next/image";

const HorizontalScroll = () => {
  return (
    <section className="min-h-screen px-10 w-[250vw]">
      <VStack>
        <div className="flex items-center gap-x-6 xl:gap-x-16">
          <ExploreCard />
          {/* Text Content */}
          <div className="space-y-4">
            <h3>Title Text</h3>
            <span>Subtitle Text</span>
            <p className="text-justify max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum lobortis sodales tincidunt. Sed eleifend scelerisque
              sollicitudin. Etiam ac lorem purus. Orci varius natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Cras erat
              orci, porttitor eget malesuada id, dictum ac tellus. Duis quam
              sapien, vestibulum sit amet nulla ac, scelerisque interdum dolor.
              Sed finibus massa massa, vel pellentesque nisi viverra non. Sed
              nec neque sed augue imperdiet tristique. Sed sit amet metus mi.
              Curabitur vitae lacus ultrices, sodales quam eleifend, consectetur
              tellus. Duis tellus leo, bibendum eu mollis ac, imperdiet ac orci.
              Suspendisse consequat volutpat justo in suscipit. Nunc.
            </p>
          </div>
          {/* Image Content */}
          <div className="flex gap-x-6 xl:gap-x-16">
            <div className="flex flex-col items-end gap-x-4 xl:gap-y-8">
              <Image
                src="/images/zoom-parallax-3.webp"
                height={1000}
                width={1000}
                alt="Image"
                className=" object-cover w-[300px] aspect-[4/5]"
              />
              <Image
                src="/images/zoom-parallax-5.webp"
                height={1000}
                width={1000}
                alt="Image"
                className="object-cover object-right w-[300px] aspect-square"
              />
            </div>
            <div className="flex-center gap-x-6 xl:gap-x-16">
              <Image
                src="/images/zoom-parallax-4.webp"
                height={1000}
                width={1000}
                alt="Image"
                className="object-cover w-[400px] aspect-[4/6]"
              />
              <Image
                src="/images/zoom-parallax-3.webp"
                height={1000}
                width={1000}
                alt="Image"
                className="object-cover w-[400px] h-full"
              />
              <Image
                src="/images/zoom-parallax-4.webp"
                height={1000}
                width={1000}
                alt="Image"
                className="object-cover w-[400px] aspect-[4/5]"
              />
              <Image
                src="/images/zoom-parallax-6.webp"
                height={1000}
                width={1000}
                alt="Image"
                className="object-cover w-[600px] aspect-square"
              />
            </div>
          </div>
        </div>
      </VStack>
    </section>
  );
};

export default HorizontalScroll;
