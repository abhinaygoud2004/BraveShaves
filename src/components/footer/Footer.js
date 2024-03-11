import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div className="bg-dark text-white mt-4 py-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={5} lg={5} className="mb-4">
            <h3 className="display-5 fw-bold">About Us</h3>
            <p className="lead mt-4">
            Welcome to Braveshaves, your ultimate destination for a premium barber appointment experience. Our modern and efficient Barber Booking application is meticulously designed to optimize the appointment booking process, eliminating unnecessary waiting times. At Braveshaves, we prioritize your time and convenience, providing a user-friendly interface for effortlessly scheduling appointments with skilled barbers. Experience our commitment to excellence as we blend cutting-edge technology with timeless grooming traditions, ensuring a top-notch service that stands apart. Welcome to a grooming journey like no other at Braveshaves.
            </p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <h3 className="display-5 fw-bold">Contact</h3>
            <p className="lead">
              <AiOutlineHome className="me-2" /> Hyderabad, Lb.nagar
            </p>
            <p className="lead">
              <AiOutlineMail className="me-2" /> abc@gmail.com
            </p>
            <p className="lead">
              <AiOutlinePhone className="me-2" /> +91 1234567890
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
