import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it('renders without crashing', function(){
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
});

it('matches snapshot', function(){
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("hides left arrow on first, hides right on last", function(){
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
    //check for left and right arrows from first image
    expect(
      container.querySelector(".bi-arrow-right-circle")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".bi-arrow-left-circle")
    ).not.toBeInTheDocument();

    //both should be visible on middle image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    expect(
      container.querySelector(".bi-arrow-right-circle")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".bi-arrow-left-circle")
    ).toBeInTheDocument();
    //check for left and right from last
    fireEvent.click(rightArrow);
    expect(
      container.querySelector(".bi-arrow-right-circle")
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".bi-arrow-left-circle")
    ).toBeInTheDocument();
})