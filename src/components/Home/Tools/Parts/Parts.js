import React from 'react';
import { useNavigate } from 'react-router-dom';

const Parts = ({part}) => {
      const navigate =useNavigate();
      const {_id,name,description,price,availableQuantity,minimumOrder,img}=part;
      
      const handlePlaceOrder=()=>{
            navigate('/placeorder')
      }
      return (
            <div>
                  <div className="card w-96  bg-base-100 shadow-xl">
                              <figure><img style={{height:"200px",width:"200px"}} src={img} alt="Shoes" /></figure>
                              <div class="card-body">
                              <h2 class="card-title">{name}</h2>
                              <p>{description.slice(0,40)}...</p>
                              <p>Per Unit Price:{price} BDT</p>
                              <p>Available Quantity{availableQuantity} Pcs</p>
                              <p>Minimum Order {minimumOrder} Pcs</p>
                              <div class="card-actions justify-end">
                              <button onClick={handlePlaceOrder} class="btn btn-accent">Place Order</button>
                              </div>
                              </div>
                              </div>
            </div>
      );
};

export default Parts;