import { Carousel } from "react-bootstrap";
import "./Home.css";
export default function Home() {
  return (
    <div className="main-home">
      <div className="h11">
        <h1>HOME</h1>
      </div>
      <div className="carousel">
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
      <div></div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>

      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>

      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>

      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
      <div> lorem </div>
    </div>
  );
}
