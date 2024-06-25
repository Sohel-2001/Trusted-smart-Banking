import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, server } from '../main';
import axios from 'axios';

const AdminHome = () => {

  const{user, isAuthenticated , adminisAuthenticated , setadminisAuthenticated} = useContext(context);

  if (!adminisAuthenticated) {
    return <Navigate to={"/"} />
}

const logoutHandler = async() =>{

  try {

    const {data} = await axios.get(`${server  }/users/logout`,{
      withCredentials : true,
    })

    alert("Logged Out Successfully");
    setadminisAuthenticated(false);
    
  } catch (error) {

    alert(error.response.data.message);
    console.log(error);
    setadminisAuthenticated(true);
    
  }
}


  return (
    <div className='admin-home relative bg-slate-500'>

      <h1 className=' absolute top-7 text-3xl text-orange-50 font-extrabold'>ADMIN PANEL</h1>

      <div className=' flex items-center gap-3 absolute top-4 left-4'>
        <img height="70" width="60" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
        
        <p className=' text-xl text-white font-semibold'>{user.name}</p>
        </div>

        <button onClick={logoutHandler} className='btn bg-red-600 text-white px-4 py-3 text-xl rounded-lg absolute top-4 right-4 hover:bg-red-800'>LogOut</button>



        <div className=' bg-slate-400 flex flex-col w-[50vw] h-[52vh] border rounded-lg overflow-hidden'>

        <Link className='  border-b-2  border-gray-500 p-6 text-center hover:bg-slate-500 transition duration-150'  to={"/adminupdate"}>Loan Requests</Link>
        
        <Link className='border-b-2  border-gray-500 p-6 text-center hover:bg-slate-500 transition duration-150' to={"/totalUsers"}>Total Users</Link>

        <Link className='border-b-2  border-gray-500 p-6 text-center hover:bg-slate-500 transition duration-150' to={"/user_verification"}>User Requests</Link>

        <Link className=' border-gray-500 p-6 text-center hover:bg-slate-500 transition duration-150' to={"/ongoing_loans"}>Ongoing Loans</Link>
        </div>

    
        {/* <Link className=' bg-indigo-700'  to={"/adminupdate"}>Loan Requests</Link>
    
        <Link className='container' to={"/totalUsers"}>Total Users</Link>

        <Link className='container' to={"/user_verification"}>User Requests</Link>
    
        <Link className='container' to={"/ongoing_loans"}>Ongoing Loans</Link> */}
    

    </div>
  )
}

export default AdminHome
// import React, { useContext } from 'react'
// import { Link, Navigate } from 'react-router-dom'
// import { context, server } from '../main';
// import axios from 'axios';

// const AdminHome = () => {

//   const{user, isAuthenticated , adminisAuthenticated , setadminisAuthenticated} = useContext(context);

//   if (!adminisAuthenticated) {
//     return <Navigate to={"/"} />
// }

// const logoutHandler = async() =>{

//   try {

//     const {data} = await axios.get(`${server  }/users/logout`,{
//       withCredentials : true,
//     })

//     alert("Logged Out Successfully");
//     setadminisAuthenticated(false);
    
//   } catch (error) {

//     alert(error.response.data.message);
//     console.log(error);
//     setadminisAuthenticated(true);
    
//   }
// }


//   return (
//     <div className='admin-home relative bg-slate-500'>

//       <div className=' flex items-center gap-3 absolute top-4 left-4'>
//         <img height="70" width="60" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
        
//         <p className=' text-xl text-white font-semibold'>{user.name}</p>
//         </div>

//         <button onClick={logoutHandler} className='btn bg-red-600 text-white px-4 py-3 text-xl rounded-lg absolute top-4 right-4 hover:bg-red-800'>LogOut</button>

    
//         <Link className='container'  to={"/adminupdate"}>Loan Requests</Link>
    
//         <Link className='container' to={"/totalUsers"}>Total Users</Link>

//         <Link className='container' to={"/user_verification"}>User Requests</Link>
    
//         <Link className='container' to={"/ongoing_loans"}>Ongoing Loans</Link>
    

//     </div>
//   )
// }

// export default AdminHome