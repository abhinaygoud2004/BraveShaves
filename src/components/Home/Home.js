import carousel1 from '../carousel/carousel1.jpeg'
import carousel2 from '../carousel/carousel2.jpeg'
import carousel3 from '../carousel/carousel3.jpg'
import './Home.css'
function Home(){
    return(
        <div className=" mt-5">
          <div id="carouselExampleDark" className="carousel carousel-fade  slide w-75 m-auto" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="1000">
      <img src={carousel1} className="d-block cimg" alt="Image Unavailable"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={carousel2} className="d-block cimg" alt="Image Unavailable"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item" >
      <img src={carousel3} className="d-block cimg" alt="Image Unavailable"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<div className="mt-5 container">
  <h2 className=''> 
    Shops Near You
  </h2>
  <div className="row row-cols-sm-2 row-cols-md-3 mt-3 g-4">
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book Slot</button>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card">
        <div className="card-body">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!</p>
          <button className='btn btn-success' style={{float:"right"}}>Book slot</button>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default Home