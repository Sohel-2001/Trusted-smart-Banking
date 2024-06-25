import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
// import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AdminUpdate = () => {

    

    const { user, isAuthenticated, adminisAuthenticated } = useContext(context);

    if (!adminisAuthenticated) {
        return <Navigate to={"/"} />
    }

    const [loanId, setloanId] = useState("");
    const [action, setaction] = useState("");
    const [loans, setloans] = useState([]);

   


    const clear = () => {
        setaction("");
        setloanId("");
    }

    const adminHandler = async (e) => {
        e.preventDefault();

        try {

            await axios.post(`${server}/users/admin/action`, {
                loanId,
                action
            }, {
                withCredentials: true,
            })

            clear();

        } catch (error) {
            console.log(error);
        }


    }

    const approveHandler = async(e) => {
        e.preventDefault();

        const {data} = await axios.put(`${server}/Homeloans/approve`,{
            id : loanId,
        },{
            withCredentials : true,
        })

        setloanId("");


    }
    const RejectHandler = async(e) => {
        e.preventDefault();

        const {data} = await axios.put(`${server}/Homeloans/reject`,{
            id : loanId,
        },{
            withCredentials : true,
        })

        setloanId("");

    }


    useEffect(() =>{
        const allLoans = async (e) => {

            const { data } = await axios.get(`${server}/Homeloans/all`)
        
            setloans(data.loans.filter(loan => loan.status == "pending"));    
    
        }

        allLoans();
    } ,[approveHandler,RejectHandler])


    return (
        <div className='h-screen w-full bg-slate-500 overflow-scroll'>

                <h1 className='totalUsers-title bg-slate-800 w-full absolute top-0 left-0 p-8 z-20 text-center text-white font-extrabold text-5xl'>Loan Requests</h1>

            <div className='show-loan-reqs mt-24'>


                <div>
                    {
                        loans.map((loan) => (

                            
                            <div key={loan._id} className='loan-details'>
                                
                                <p>User Name : </p> <h1>{loan.user_name}</h1><br />
                                <p>Loan Name : </p> <h1>{loan.loan_name}</h1><br />
                                <p>Loan Id : </p> <h1>{loan._id}</h1><br />
                                <p>Address : </p><h1>{loan.address}</h1><br />
                                <p>Phone Number : </p> <h1>{loan.phn}</h1><br />
                                <p>User Cibil Score : </p> <h1>{loan.user_Cibil}</h1><br />
                                <p>Loan Amount : </p> <h1>{loan.requested_amount}</h1><br />
                                <p>Loan Period : </p> <h1>{loan.loan_period}</h1><br />
                                <p>Loan Status : </p><h1>{loan.status}</h1><br />
                                <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
                                    <p className=' w-full'>Pan Card</p>
                                  <img className=' border border-black object-contain object-center h-full w-full' src={loan.Pan_Card} alt="" />
                                </div>
                                <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
                                    <p className=' w-full'>Income Certificate</p>
                                  <img className=' border border-black object-contain object-center h-full w-full' src={loan.Income_Certificate} alt="" />
                                </div>
                                <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
                                    <p className=' w-full'>Birth Certificate</p>
                                  <img className=' border border-black object-contain object-center h-full w-full' src={loan.Birth_Certificate} alt="" />
                                </div>
                                <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
                                    <p className=' w-full'>Adhaar Card</p>
                                  <img className=' border border-black object-contain object-center h-full w-full' src={loan.Adhaar_Card} alt="" />
                                </div>

                                

                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='loan-update'>

                <form action="" onSubmit={approveHandler}>
                    <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='enter'/>
                    <div className="btn">
                    <button>Approve</button>
                    <button onClick={RejectHandler}>Reject</button>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default AdminUpdate
// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { context, server } from '../main';
// // import toast from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';

// const AdminUpdate = () => {

    

//     const { user, isAuthenticated, adminisAuthenticated } = useContext(context);

//     if (!adminisAuthenticated) {
//         return <Navigate to={"/"} />
//     }
//     // if(isAuthenticated || !adminisAuthenticated){
//     //     return <Navigate to={"/"}/>
//     // }

//     const [loanId, setloanId] = useState("");
//     const [action, setaction] = useState("");
//     const [loans, setloans] = useState([]);

   


//     const clear = () => {
//         setaction("");
//         setloanId("");
//     }

//     const adminHandler = async (e) => {
//         e.preventDefault();

//         try {

//             await axios.post(`${server}/users/admin/action`, {
//                 loanId,
//                 action
//             }, {
//                 withCredentials: true,
//             })

//             // toast.success("Request Updated");
//             clear();

//         } catch (error) {
//             console.log(error);
//             // toast.error("error");
//         }


//     }

//     const approveHandler = async(e) => {
//         e.preventDefault();

//         const {data} = await axios.put(`${server}/Homeloans/approve`,{
//             id : loanId,
//         },{
//             withCredentials : true,
//         })

//         setloanId("");


//     }
//     const RejectHandler = async(e) => {
//         e.preventDefault();

//         const {data} = await axios.put(`${server}/Homeloans/reject`,{
//             id : loanId,
//         },{
//             withCredentials : true,
//         })

//         setloanId("");

//     }


//     useEffect(() =>{
//         const allLoans = async (e) => {

//             const { data } = await axios.get(`${server}/Homeloans/all`)
    
//             // console.log(data.loans);
    
//             setloans(data.loans.filter(loan => loan.status == "pending"));
    
//             // setloans.push(data.loans);
    
//             //    data.loans.forEach((l) => (
//             //     setloans(l)
//             //    ))
    
    
//         }

//         allLoans();
//     } ,[approveHandler,RejectHandler])

    
//     // allLoans();

//     // if(!adminisAuthenticated){
//     //     return <Navigate to={"/"}/>
//     // }

//     return (
//         <div className='update-main'>

//             <div className='show-loan-reqs'>

//                 <h1 className='title'>Loan Requests</h1>

//                 {/* <div className='loan-details'>

//                     <p>User Name : </p> <h1>Sohel Mollah</h1><br />
//                     <p>Loan Id : </p> <h1>DHDH218239879</h1><br />
//                     <p>Address : </p><h1>Nodakhali</h1><br />
//                     <p>Phone Number : </p> <h1>9875699646</h1><br />
//                     <p>Loan Amount : </p> <h1>50000</h1><br />
//                     <p>Loan Status : </p><h1>Pending</h1><br />

//                 </div>
//                 <div className='loan-details'>

//                     <p>User Name : </p> <h1>Sohel Mollah</h1><br />
//                     <p>Loan Id : </p> <h1>DHDH218239879</h1><br />
//                     <p>Address : </p><h1>Nodakhali</h1><br />
//                     <p>Phone Number : </p> <h1>9875699646</h1><br />
//                     <p>Loan Amount : </p> <h1>50000</h1><br />
//                     <p>Loan Status : </p><h1>Pending</h1><br />

//                 </div> */}

//                 <div>
//                     {
//                         loans.map((loan) => (

                            
//                             <div key={loan._id} className='loan-details'>

//                                 {/* {
//                                     loan.status == "pending" ? 
//                                     ` <p>User Name : </p> <h1>${loan.user_name}</h1><br />
//                                     <p>Loan Id : </p> <h1>${loan._id}</h1><br />
//                                     <p>Address : </p><h1>${loan.address}</h1><br />
//                                     <p>Phone Number : </p> <h1>${loan.phn}</h1><br />
//                                     <p>Loan Amount : </p> <h1>${loan.requested_amount}</h1><br />
//                                     <p>Loan Status : </p><h1>${loan.status}</h1><br />` 
//                                     : 
                                    
//                                     ""
//                                 } */}

                                
//                                 <p>User Name : </p> <h1>{loan.user_name}</h1><br />
//                                 <p>Loan Name : </p> <h1>{loan.loan_name}</h1><br />
//                                 <p>Loan Id : </p> <h1>{loan._id}</h1><br />
//                                 <p>Address : </p><h1>{loan.address}</h1><br />
//                                 <p>Phone Number : </p> <h1>{loan.phn}</h1><br />
//                                 <p>User Cibil Score : </p> <h1>{loan.user_Cibil}</h1><br />
//                                 <p>Loan Amount : </p> <h1>{loan.requested_amount}</h1><br />
//                                 <p>Loan Period : </p> <h1>{loan.loan_period}</h1><br />
//                                 <p>Loan Status : </p><h1>{loan.status}</h1><br />
//                                 <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
//                                     <p className=' w-full'>Pan Card</p>
//                                   <img className=' border border-black object-contain object-center h-full w-full' src={loan.Pan_Card} alt="" />
//                                 </div>
//                                 <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
//                                     <p className=' w-full'>Income Certificate</p>
//                                   <img className=' border border-black object-contain object-center h-full w-full' src={loan.Income_Certificate} alt="" />
//                                 </div>
//                                 <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
//                                     <p className=' w-full'>Birth Certificate</p>
//                                   <img className=' border border-black object-contain object-center h-full w-full' src={loan.Birth_Certificate} alt="" />
//                                 </div>
//                                 <div className=' h-[20rem] w-[30rem] flex gap-10 mb-5'>
//                                     <p className=' w-full'>Adhaar Card</p>
//                                   <img className=' border border-black object-contain object-center h-full w-full' src={loan.Adhaar_Card} alt="" />
//                                 </div>

                                

//                             </div>
//                             // <p>{loan.address}</p>
//                         ))
//                     }
//                 </div>


//                 {/* <button onClick={allLoans}>click</button> */}



//             </div>

//             <div className='loan-update'>

//                 {/* <form onSubmit={adminHandler} action="">

//                     <div className='Loan-Id'>
//                         <label htmlFor="">Loan Id</label>
//                         <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='Enter Loan Id...' />
//                     </div>

//                     <div className='Loan-Id'>
//                         <label htmlFor="">Action</label>
//                         <input type="text" value={action} onChange={(e) => setaction(e.target.value)} placeholder='Enter Loan Id...' />
//                     </div>




//                     <button type="submit">Accept</button>
//                     <button>Reject</button>

//                 </form> */}


//                 <form action="" onSubmit={approveHandler}>
//                     <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='enter'/>
//                     <div className="btn">
//                     <button>Approve</button>
//                     <button onClick={RejectHandler}>Reject</button>
//                     </div>
//                 </form>

//                 {/* <form action="" onSubmit={RejectHandler}>
//                     <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='enter'/>
//                     <button>Reject</button>
//                 </form> */}
//             </div>

//         </div>
//     )


//     // return (
//     //     <div className='admin_outer'>
//     //         <div className="admin_inner">


//     //             <form onSubmit={adminHandler} action="">

//     //                 <div>
//     //                     <h4>LoanId</h4>
//     //                     <input type="text" value={loanId} onChange={(e) => setloanId(e.target.value)} placeholder='Enter LoanId..' />
//     //                 </div>

//     //                 <div>
//     //                     <h4>Action</h4>
//     //                     <input type="text" value={action} onChange={(e) => setaction(e.target.value)} placeholder='Enter action..' />
//     //                 </div>

//     //                 <button>Proceed</button>
//     //             </form>

//     //         </div>

//     //         {/* <div className='allLoans'>
//     //             <h2>All Loan Requests</h2>

//     //            <button onClick={allLoans}>click</button>
//     //         </div> */}
//     //     </div>
//     // )
// }

// export default AdminUpdate