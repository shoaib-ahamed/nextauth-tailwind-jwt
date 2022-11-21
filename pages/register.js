import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import Layout from '../layout/layout';
import { registerValidate } from '../lib/validate';
import styles from '../styles/Form.module.css';
const baseUrl = process.env.NEXTAUTH_URL


export default function Register(){

    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: '',
            phone: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values){
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch(`${baseUrl}/api/auth/signup`, options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push(`${baseUrl}`)
            })

        // const res = await postData('auth/signup' , values)

        // if(res.err) return dispatch({ type: 'NOTIFY' ,  payload: {error: res.err } })
        // dispatch({ type: 'NOTIFY' ,  payload: {success: res.msg }})
            
        // if(res.status == true) router.push(`${baseUrl}`)
    }

    return (
        <Layout>


        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 md:w-1/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl text-center font-bold py-4'>Register</h1>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='Username'
                    className={styles.input_text}
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

                <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                <div className={`${styles.input_group} ${formik.errors.phone && formik.touched.phone ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='phone'
                    placeholder='Phone Number'
                    className={styles.input_text}
                    {...formik.getFieldProps('phone')}
                    />
                </div>
                {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

                {/* login buttons */}
                <div className="flex justify-center">
                    <button type='submit' className="rounded-full px-12 py-2 inline-block font-bold text-green-800 border border-green-800 hover:bg-green-800 hover:text-white hover:border-black">
                        Sign Up
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/login'}><a className='text-green-800'>Sign In</a></Link>
            </p>
        </section>
        </Layout>
    )
}