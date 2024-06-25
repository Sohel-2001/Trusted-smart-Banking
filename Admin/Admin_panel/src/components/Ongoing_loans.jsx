import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Ongoing_loans = () => {

    const { user, isAuthenticated, adminisAuthenticated } = useContext(context);

    if (!adminisAuthenticated) {
        return <Navigate to={"/"} />
    }

    const [loans, setloans] = useState([]);



    useEffect(() => {
        const allLoans = async (e) => {

            const { data } = await axios.get(`${server}/Homeloans/all`)

            // console.log(data.loans);

            setloans(data.loans.filter(loan => loan.status == "accepted"));

            // setloans.push(data.loans);

            //    data.loans.forEach((l) => (
            //     setloans(l)
            //    ))


        }

        allLoans();
    }, [])

    return (
        <div>

            <div className='totalUsers-main relative'>
                    <h1 className='totalUsers-title bg-slate-800 w-full absolute top-0 left-0 p-8 z-20 text-center text-white font-extrabold text-5xl'>Ongoing Loans</h1>

                <div className='show-totalUsers bg-slate-500 mt-24'>



                    <div>
                        {
                            loans.map((loan) => (

                                
                                
                                <div key={loan._id} className='user-details'>

                                    


                                    <p>User Name : </p> <h1>{loan.user_name}</h1><br />
                                    <p>Loan Name : </p> <h1>{loan.loan_name}</h1><br />
                                    <p>Loan Id : </p> <h1>{loan._id}</h1><br />
                                    <p>Address : </p><h1>{loan.address}</h1><br />
                                    <p>Phone Number : </p> <h1>{loan.phn}</h1><br />
                                    <p>User Cibil Score : </p> <h1>{loan.user_Cibil}</h1><br />
                                    <p>Loan Amount : </p> <h1>{loan.requested_amount}</h1><br />
                                    <p>Loan Period : </p> <h1>{loan.loan_period}</h1><br />
                                    <p>Loan Status : </p><h1>{loan.status}</h1><br />




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

        </div>
    )
}

export default Ongoing_loans