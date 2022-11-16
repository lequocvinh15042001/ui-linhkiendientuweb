import React, { Fragment } from "react";
import styled from "styled-components";

import { PageHero } from "../components";
import aboutImg from "../assets/elec.jpg";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AboutPage = () => {
  const defaultProps = {
    center: {
        lat: 10.8504205,
        lng: 106.7716593
    },
    zoom: 12
};
  return (
    <Fragment>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="heroimage" className="" />
        <article>
          <div className="title">
            <h2>Câu chuyện của chúng tôi</h2>
            <div className="underline"></div>
          </div>
          <p>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC1qV4AS7bjTPtqF1KkCX7wF0r3vvnJdmQ&callback=initMap" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <AnyReactComponent
                lat={41.40338}
                lng={2.17403}
                text="My Marker"
            />
          </GoogleMapReact> */}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur itaque harum nisi cupiditate, modi molestias distinctio
            odio possimus sapiente, ipsa ullam veritatis. Delectus dolorum
            recusandae accusamus vero voluptatum commodi optio saepe totam
            voluptas asperiores consequuntur, quos iste laudantium libero
            minima? Nulla, impedit. Itaque quae voluptate ad consequatur ea
            maxime unde.
          </p>
          </p>
          <p>
            Hotline: (+84) 999 99 999
          </p>
        </article>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
    transition: transform 250ms;
    :hover{
      transform: translateY(-20px);
    }
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
