import './SignUp.css'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import { login, loginRequest, loginSuccess, loginFailure, signup } from '../../redux/actions/authActions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const { v4: uuidv4 } = require('uuid');
    let {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch();
    const users=useSelector((state)=>state.users)
    //HTTP req error state
    let [err,setErr]=useState("")

    function generateUserId() {
        return uuidv4();
    }
    let addUser=(newUser)=>{
        const userId = generateUserId(); // Replace this with your logic to get the user ID
        
        // Create a modified newUser object with the appended user ID
        const modifiedUser = {
            ...newUser,
            userId: userId, // Append the user ID here
        };
        dispatch(signup(modifiedUser))
    }
    let navigate=useNavigate()
  return (
    <div className='container-fluid signMain pb-5'>
        {/*HTTP err message */}
        {err.length!=0&&<p className="text-center lead display-3 fw-bold text-danger">{err}</p>}
        <form action="" onSubmit={handleSubmit(addUser)} className='signBg border border-0 rounded mt-0  pt-5'>
            <div className="form-floating">
                <input type="text" name="name" placeholder='hi' id="name" className='form-control mt-3' {...register("name",{required:true})}/>
                <label htmlFor="name"className='form-label'>name</label>
                {errors.name?.type&&<p className='text-danger'>*name is required</p>}
            </div> 
            <div className="form-floating">
                <input type="email" placeholder='hi' name="email" id="email" className='form-control mt-3' {...register("email",{required:true})}/>
                <label htmlFor="email">Email</label>
                {errors.email?.type&&<p className='text-danger'>*Email is required</p>}
            </div>
            <div className="form-floating">
                <input type="text" name="phone" id="phone" placeholder='hi' className='form-control mt-3' {...register("phone",{required:true})}/>
                <label htmlFor="phone">Mobile number</label>
                {errors.mobileno?.type&&<p className='text-danger'>*Mobile no is required</p>}
            </div>
                            <div className="form-floating">
                <select
                    id="role"
                    className="form-select mt-3"
                    {...register("role", { required: true })}
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="barber">Barber</option>
                </select>
                <label htmlFor="role">Role</label>
                {errors.role?.type && (
                    <p className="text-danger">*Role is required</p>
                )}
                </div>

            <div className="form-floating">
                <input type="password" placeholder='hi' name="password" id="password" className='form-control mt-3'{...register("password",{required:true})} />
                <label htmlFor="password">Password</label>
                {errors.password?.type&&<p className='text-danger'>*Password is required</p>}
            </div>
            <div className="form-floating">
                <input type="password" placeholder='hi' name="repassword" id="repassword" className='form-control mt-3' {...register("repassword",{required:true})}/>
                <label htmlFor="repassword">Re-enter Password</label>
                {errors.repassword?.type&&<p className='text-danger'>*Password is required</p>}
            </div>

            <button type='submit' onClick={navigate('/login')} className='buttonSignup mt-3 btn btn-success'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp