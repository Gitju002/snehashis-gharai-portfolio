import React from "react";
import ExploreCard from "./ExploreCard";
import VStack from "./layout/VStack";
import Container from "./layout/Container";
import Link from "next/link";

const ExploreCardSection = () => {
  return (
    <section>
      <VStack>
        <Container className="explore-section-container">
          <ExploreCard />
          <Link href="/passion/horizontal-scroll">
            <button
              data-scroll
              data-scroll-speed="0.1"
              className="glass-button"
            >
              <p>Explore More</p>{" "}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_243_73"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="20"
                  height="21"
                >
                  <path
                    d="M12 3.24219C16.97 3.24219 21 7.27219 21 12.2422C21 17.2122 16.97 21.2422 12 21.2422C7.03 21.2422 3 17.2122 3 12.2422C3 7.27219 7.03 3.24219 12 3.24219Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.8 14.0422L7 17.2422L10.2 10.4422L17 7.24219L13.8 14.0422Z"
                    fill="white"
                  />
                  <path
                    d="M12 13.2422C12.5523 13.2422 13 12.7945 13 12.2422C13 11.6899 12.5523 11.2422 12 11.2422C11.4477 11.2422 11 11.6899 11 12.2422C11 12.7945 11.4477 13.2422 12 13.2422Z"
                    fill="black"
                  />
                </mask>
                <g mask="url(#mask0_243_73)">
                  <path
                    d="M24 0.242188H0V24.2422H24V0.242188Z"
                    fill="#E8E8E8"
                  />
                </g>
              </svg>
            </button>
          </Link>
        </Container>
      </VStack>
    </section>
  );
};

export default ExploreCardSection;
