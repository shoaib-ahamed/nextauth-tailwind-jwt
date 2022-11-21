import { useFormik } from 'formik';
import Cookie from 'js-cookie';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import login_validate from '../lib/validate';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';


const baseUrl = process.env.NEXTAUTH_URL


export default function SignIn(){

    const [show, setShow] = useState(false)
    const router = useRouter()

    const [state , dispatch] = useContext(DataContext)
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : login_validate,
        onSubmit
    })

    /**
     * haleykennedy@gmail.com
     * admin123
     */

    async function onSubmit(values){


        const res = await postData('/auth/login' , values)

        if(res.err) return dispatch({ type: 'NOTIFY' ,  payload: {error: res.err}})
    
            dispatch({ type: 'NOTIFY' ,  payload: {success: res.msg}})

            dispatch({ type: 'AUTH' ,  payload: {
            token: res.access_token,
            user: res.user
            }})

        Cookie.set('refreshtoken' , res.refresh_token , {
            path: 'api/auth/accessToken',
            expires: 7
            })
    
        localStorage.setItem('firstLogin' , true)
        
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })


        if(status.ok) router.push(status.url)
        
    }

    // Google Handler function
    async function handleGoogleSignin(){
        dispatch({ type: 'NOTIFY', payload: {}})
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    // Github Login 
    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "http://localhost:3000"})
    }

    return (
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-3xl text-center font-bold py-4'>Sign in</h1>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>

                <div className="input-button flex justify-center">
                    <button type='button'  onClick={handleGoogleSignin} className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-winterSky">
                    <FaGoogle className="text-3xl md:text-xl" />
                    </button>
                </div>

                <p className="text-gray-400 my-3 text-center ">or use your email account</p>
                
                <div className={`flex position:relative ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className="w-full px-4 rounded-md py-3 text-winterSky text-lg"
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                   
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

                <div className={`flex position:relative ${formik.errors.password && formik.touched.password ? 'border-rose-800' : ''}`}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className="w-full px-4 rounded-md py-3 text-winterSky text-lg"
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                   
                </div>

                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className="bg-jet rounded-full px-12 py-2 inline-block font-bold text-green-800 border border-green-800 hover:bg-green-800 hover:text-white hover:border-black">
                        Login
                    </button>
                </div>
                
                {/* <div className="input-button">
                    <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div> */}
            </form>
        </section>
    )
}