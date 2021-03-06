import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePartsById from './../Hooks/usePartsById';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
      const {partsId}=useParams();
      const [part]=usePartsById(partsId);
      const [user]=useAuthState(auth);
      const navigate=useNavigate()
      const [order,setOrder]=useState()
      const { register,formState: { errors }, handleSubmit } = useForm();
      const price =part.price;
      const orderPartsId =part._id;
            
      const onSubmit = (data) => {
      const userOrderPcs = data.minquentity;
            
           
          ;
            let totalPrice = price + userOrderPcs;
            console.log(totalPrice)
            const userOrder ={
                   email : data.email,
                   name : data.name,
                   phone: data.phone,
                   partsName:data.partsName,
                   order:userOrderPcs,
                   amount:totalPrice,
                   orderPartsId:orderPartsId,
                   
            }
           
           
                  
              fetch('https://limitless-woodland-16405.herokuapp.com/placeorder',
               {
                  method: 'POST',
                  headers: {
                        'content-type': 'application/json'
                        
                  },
                  body: JSON.stringify(userOrder)
            })
            .then(res=>res.json())
            .then(data=>{
                
                  if(data){
                    toast.success(`Order Placed. Please make payment to confirmed ${userOrderPcs} Psc`)
                }
                else{
                    toast.error(`Try Again`)
                }
                ;
                navigate('/dashboard/myorder')
            })

            
            
            };
      
    
      return (
            
                 
                        
                  <div className='grid grid-cols-1 lg:grid-cols-2 m-4 p-2' >
                              <div class="card w-96 bg-base-100 shadow-xl">
                                    <figure class="px-10 pt-10">
                                    <img src={part.img} alt={part.name} class="rounded-xl" />
                                    </figure>
                                    <div class="card-body items-center text-center">
                                    <h2 class="card-title">{part.name}</h2>
                                    <p>{part.description}</p>
                                    <p className='font-bold'>Per Unit Price:  {part.price} BDT</p>
                                    <p className='font-bold'>Available Quantity  {part.availableQuantity} Pcs</p>
                                    <p className='font-bold'>Minimum Order  {part.minimumOrder} Pcs</p>
                                    </div>
                               </div>
                        
                       

                        <div className=' mt-52 p-2 gap-3'>
                              <h1 className='text-center text-accent font-extrabold '>Purchse Now !</h1>
                              
                              <form className='  flex flex-col  gap-2 mt-4' onSubmit={handleSubmit(onSubmit)}>
                              <input type="email" name="email" value={user?.email} id="email" className='border-2 p-2' {...register("email")} readOnly/>
                              <input type="text" name="name" value={user?.displayName} id="name" className='border-2 p-2' {...register("name")} readOnly/>
                              <input type="text" name="name2"  placeholder='Please write product name' id="name2" className='border-2 p-2' {...register("partsName")} required />
                              <input className='border-2 p-2' type="number" {...register("minquentity" ,{ min:`${part.minimumOrder}`, max: `${part.availableQuantity}` } )} required placeholder='Please Order Quantity'  />
                               {errors.minquentity?.type === 'min' && "Please Maintain Min Order"}
                               {errors.minquentity?.type === 'max' && "Please Maintain Max Order"}
                              <input className='border-2 p-2' type="text" {...register("phone")} required placeholder='Your Phone Number'/>
                              <input className=' p-2 bg-accent text-white' type="submit" value='Purchase Now' />
                              </form>
                        </div>
                              
                  
                  </div>
            
      );
};

export default PlaceOrder;