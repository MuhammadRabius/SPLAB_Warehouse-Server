
import React from 'react';

import { AiFillPhone,AiTwotoneMail,AiOutlineUserAdd,AiOutlineCustomerService } from "react-icons/ai";
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const TopBanner = () => {
      const [user]=useAuthState(auth);
      return (
            <div>
                  <div className='lg:flex  lg:justify-around mt-2 ml-20 font-thin'>
                        <p>1/2, Koshaituli Lane, Bongshal Road, Dhaka-1100</p>
                        <p className='flex items-center ml-20 gap-2'><AiFillPhone/>0000000000</p>
                        <p className='flex items-center ml-20gap-2'><AiTwotoneMail/> support.ridershome@gmail.com</p>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3'>
                  <div>
                   <img className='w-56 ml-20 lg:ml-12' src={logo} alt="Riders-Home Logo" />
                   </div>
                  
                  <div className='mt-20 '>
                        <input className='border border-2 p-2 ml-2 w-80 rounded-xl' type="search" name="search" placeholder='Search...' id="" />
                        <button className='border border-2 ml-4 p-2 hover:bg-slate-300 rounded-xl' type="submit">Search</button>
                  </div>
                 
                
                  <div className=' flex justify-center mt-20 gap-10 '>
                        <div>
                        <AiOutlineUserAdd className='ml-8'/>
                        <Link to={user?`/dashboard`:`/login`} class="link text-black link-hover">

                              {
                                    user? `${user?.displayName}`:`My Account`
                              }

                        </Link>
                        </div>
                        
                        <div>
                        <AiOutlineCustomerService className='ml-8'/>
                        <Link to={'/customerhelp'} class="link text-black link-hover">Customer Help</Link>
                        <p> </p>
                        </div>

                  </div>
                  </div>

                  
                  
            </div>
      );
};

export default TopBanner;