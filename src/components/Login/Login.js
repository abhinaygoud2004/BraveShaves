import './Login.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/actions/userAction';
import { login } from '../../redux/actions/authActions';
import { loginFailure } from '../../redux/actions/authActions';


function Login() {
    const dispatch = useDispatch();
    const isLogin=useSelector((state)=>state.auth.isLogin)
    const userId=useSelector((state)=>state.auth.userId);
    const authError = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    let navigate = useNavigate();
    useEffect(()=>{
        if(isLogin)
            navigate('/')
        dispatch(getUserData(userId))
    },[isLogin])
    const handleInputChange = (event) => {
        dispatch(loginFailure(null)); // clear old error
        setCredentials({
          ...credentials,
          [event.target.name]: event.target.value,
        });
      };

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login(credentials));
      };
    return (
        <div className='container-fluid main'>
            <div className='basic border  border-0 rounded'>
                <div className="left ">
                    <h1 className='display-1'>Welcome to <br></br><span className=' fw-semibold'>Brave Shaves,</span></h1>
                </div>
                <div className="right">
                    <h1 className='display-1 lh-lg fw-semibold'>Login</h1>
                                            <form onSubmit={handleLogin}>
                        <div className='input-group mt-3'>
                            <span className='input-group-text'>Username</span>
                            <input
                            onChange={handleInputChange}
                            type="text"
                            className='form-control'
                            name="username"
                            />
                        </div>

                        <div className='input-group mt-3'>
                            <span className='input-group-text'>Password</span>
                            <input
                            onChange={handleInputChange}
                            type="password"
                            className='form-control'
                            name="password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success mt-3"
                            disabled={loading}
                        >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {authError && (
                        <div className="alert alert-danger mt-3">
                        {authError}
                        </div>
                    )}
                    </form>

                    <h6 className='mt-5 ms-5'>Didn't have an account ?</h6>
                    <h6><div onClick={() => { navigate('/signup'); }}
                        className='text-decoration-none' style={{
                            color: "#d3ac5e",
                            fontWeight: "bold",
                            fontSize: "20px",
                            cursor: "pointer"
                        }
                        } >Sign Up</div></h6>

                </div>
            </div>

        </div>
    )
}

export default Login