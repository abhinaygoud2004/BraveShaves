import React from 'react'
import MenuWrapper from "../common/MenuWrapper"
import PlainModal from '../Modal/PlainModal'
import { useState } from 'react'
import DateTimePicker from '../DateTimePicker/DateTimePicker';

function Shops() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    let data = [
        {
          index: 1,
          value: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!"
        }
        ,
        {
          index: 2,
          value: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!"
        },
        {
          index: 3,
          value: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!"
        },
        {
          index: 4,
          value: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!"
        },
        {
          index: 5,
          value: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, delectus. In sapiente eaque minus molestias nemo eos commodi accusantium sunt!"
        }
      ]
  return (
    <div className="mt-5 container">
        <h2 className=''>
          Shops Near You
        </h2>
        <div className="row row-cols-sm-2 row-cols-md-3 mt-3 g-4">
          {
            data.map((item,index)=>(
              <div key={index} className="col">
              <div className="card">
                <div className="card-body">
                 {item.value}
                  <button className='btn btn-success' onClick={handleOpenModal}  style={{ float: "right" }}>Book Slot</button>
                </div>
              </div>
            </div>
            ))
          }
          <PlainModal isOpen={isModalOpen} onClose={handleCloseModal} body={<DateTimePicker/>}/>
        </div>
      </div>
  )
}

export default Shops