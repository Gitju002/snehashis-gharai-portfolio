import React from "react";
import VStack from "./layout/VStack";
import Container from "./layout/Container";
import ExploreCard from "./ExploreCard";

const HorizontalScroll = () => {
  return (
    <section className="w-[300vw]">
      <VStack>
        <div className="p-10 flex gap-16">
          <ExploreCard />
          {/* Text Content */}
          <div className="space-y-4">
            <h3>Title Text</h3>
            <span>Subtitle Text</span>
            <p className="w-[495px]">
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
          <div></div>
        </div>
      </VStack>
    </section>
  );
};

export default HorizontalScroll;
