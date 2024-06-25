import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
// import toast from 'react-hot-toast';

const TotalUsers = () => {


    const {  isAuthenticated, adminisAuthenticated } = useContext(context);

    if (!adminisAuthenticated) {
        return <Navigate to={"/"} />
    }
    // if(isAuthenticated || !adminisAuthenticated){
    //     return <Navigate to={"/"}/>
    // }

    const [id, setId] = useState("");
    const [action, setaction] = useState("");
    const [users, setusers] = useState([]);

   


    const clear = () => {
        setaction("");
        setloanId("");
    }

    

 
   


    useEffect(() =>{
        const allLoans = async (e) => {

            const { data } = await axios.get(`${server}/users/all`)
    
            // console.log(data.only_users);
    
            setusers(data.only_users.filter(user => user.verified == true));
    
            // setloans.push(data.loans);
    
            //    data.loans.forEach((l) => (
            //     setloans(l)
            //    ))
    
    
        }

        allLoans();
    },[])

    const deleteUser = async(e) => {
        e.preventDefault();

       try {

        const {data} = await axios.delete(`${server}/users/delete`,{
            id ,
        },{
            withCredentials: true,
        })

        toast.success(data.message);

        setId("");
        
       } catch (error) {
        toast.error(error.response.data.message)
       }

    }
    // } ,[approveHandler,RejectHandler])

    
    // allLoans();

    // if(!adminisAuthenticated){
    //     return <Navigate to={"/"}/>
    // }

  return (
    <div className='totalUsers-main relative'>
        
        <h1 className='totalUsers-title bg-slate-800 w-full absolute top-0 left-0 p-8 z-20 text-center text-white font-extrabold text-5xl'>Total Users</h1>

            <div className='show-totalUsers bg-slate-500 mt-24'>



                <div>
                    {
                        users.map((user) => (

                            
                            <div key={user._id} className='user-details relative'>

                               
                                <div className=' border border-black absolute top-4 right-4 h-[20vh] w-[20vh] rounded-full bg-neutral-800 overflow-hidden'>
                                <img className=' h-full w-full object-cover object-top' src={user.avatar || null} alt="" />
                                </div>
                                <p>User Name : </p> <h1>{user.name}</h1><br />
                                <p>balance : </p> <h1>{user.balance}</h1><br />
                                <p>id : </p> <h1>{user._id}</h1><br />
                                <p>Phone Number : </p> <h1>{user.phone}</h1><br />
                                <p>User Cibil Score : </p> <h1>{user.CIBIL_score}</h1><br />
                                <p>email : </p> <h1>{user.email}</h1><br />
                                

                                

                            </div>
                            // <p>{loan.address}</p>
                        ))
                    }
                </div>





            </div>

            {/* <div className='loan-update'>



                <form action="">
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder='enter'/>
                    <div className="btn">
                    <button onClick={deleteUser}>Delete</button>
                    </div>
                </form>

            </div> */}

        </div>
    )

  
}

export default TotalUsers