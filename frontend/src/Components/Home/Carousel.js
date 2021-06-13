import { Carousel } from "react-bootstrap";
export function MidCarousel() {
  return (
    <div className="featured-carousel">
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block"
            src="https://www.w3schools.com/w3css/img_lights.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block"
            src="https://www.w3schools.com/w3css/img_lights.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
