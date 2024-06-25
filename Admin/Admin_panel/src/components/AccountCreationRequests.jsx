import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
// import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AccountCreationRequests = () => {



    const { user, isAuthenticated, adminisAuthenticated } = useContext(context);

    if (!adminisAuthenticated) {
        return <Navigate to={"/"} />
    }


    const [userId, setUserId] = useState("");
    const [action, setaction] = useState("");
    const [users, setUsers] = useState([]);




    const clear = () => {
        setaction("");
        setloanId("");
    }

    const approveHandler = async (e) => {
        e.preventDefault();

        const { data } = await axios.post(`${server}/admins/userApprove`, {
            userId,
        }, {
            withCredentials: true,
        })

        setUserId("");


    }


    useEffect(() => {
        const allUsers = async (e) => {

            const { data } = await axios.get(`${server}/users/all`)

            // console.log(data);

            // setloans(data.filter(loan => loan.status == "pending"));
            setUsers(data.only_users.filter(user => user.verified == false));


            // setloans.push(data.loans);

            //    data.loans.forEach((l) => (
            //     setloans(l)
            //    ))


        }

        allUsers();
    }, [approveHandler])



    return (
        <div className='update-mainn h-screen overflow-scroll w-full bg-slate-500'>

                <h1 className='totalUsers-title bg-slate-800 w-full absolute top-0 left-0 p-8 z-20 text-center text-white font-extrabold text-5xl'>User Account Creation Requests</h1>
            <div className='show-loan-reqs mt-24'>


                <div>
                    {
                        users.map((user) => (


                            <div key={user._id} className='loan-details relative'>

                                <div className=' h-[10rem] w-[10rem] rounded-xl overflow-hidden absolute right-3'>
                                    <img className=' border border-blackk object-cover object-center h-full' src={user.avatar} alt="" />
                                </div>

                                <p>Name : </p> <h1>{user.name}</h1><br />
                                <p>Email : </p> <h1>{user.email}</h1><br />
                                <p>User Id : </p> <h1>{user._id}</h1><br />
                                <p>Phone Number: </p><h1>{user.phone}</h1><br />
                                <p>Pan Number : </p> <h1>{user.pan}</h1><br />
                                <p>Age : </p> <h1>{user.age}</h1><br />
                                <p>Gender : </p> <h1>{user.gender}</h1><br />
                                



                            </div>
                            
                            // <p>{loan.address}</p>
                        ))
                    }
                </div>


                {/* <button onClick={allLoans}>click</button> */}



            </div>

            <div className='loan-update'>
                <form action="" onSubmit={approveHandler}>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='enter' />
                    <div className="btn">
                        <button type='submit'>Approve</button>
                        {/* <button onClick={RejectHandler}>Reject</button> */}
                    </div>
                </form>

            </div>

        </div>
    )


    // return (
    //     <div className='admin_outer'>
    //         <div className="admin_inner">


    //             <form onSubmit={adminHandler} action="">

    //                 <div>
    //                     <h4>LoanId</h4>
    //                     <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='Enter LoanId..' />
    //                 </div>

    //                 <div>
    //                     <h4>Action</h4>
    //                     <input type="text" value={action} onChange={(e) => setaction(e.target.value)} placeholder='Enter action..' />
    //                 </div>

    //                 <button>Proceed</button>
    //             </form>

    //         </div>

    //         {/* <div className='allLoans'>
    //             <h2>All Loan Requests</h2>

    //            <button onClick={allLoans}>click</button>
    //         </div> */}
    //     </div>
    // )
}

export default AccountCreationRequests