import {AiOutlineHome,AiOutlineMail,AiOutlinePhone} from "react-icons/ai"

function Footer(){
    return(
        <div className="d-flex p-5 bg-dark text-white justify-content-evenly mt-4">
            <div className="ms-3 w-25">
                <h3 className="display-5 fw-bold">About Us</h3>
                <p className="lead mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptas assumenda vero totam praesentium doloribus rerum velit optio dolore! Inventore eos harum delectus aut aliquid fugiat unde eveniet consectetur ipsum!</p>
            </div>
            <div className="ms-3">
                <h3 className="display-5 fw-bold">Contact</h3>
                <p className="lead"><AiOutlineHome className="me-2"/>Hyderabad, Lb.nagar</p>
                <p className="lead"><AiOutlineMail className="me-2"/>abc@gmail.com</p>
                <p className="lead"><AiOutlinePhone className="me-2"/>+91 1234567890</p>
            </div>
        </div>
    )
}
export default Footer