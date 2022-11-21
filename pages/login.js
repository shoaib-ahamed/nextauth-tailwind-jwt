import Head from 'next/head';
import Link from 'next/link';
import SignIn from '../components/SignIn';



export default function Login(){

    // const [show, setShow] = useState(false)
    // const router = useRouter()
    // // formik hook
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: ''
    //     },
    //     validate : login_validate,
    //     onSubmit
    // })

    // /**
    //  * haleykennedy@gmail.com
    //  * admin123
    //  */

    // async function onSubmit(values){
    //     const status = await signIn('credentials', {
    //         redirect: false,
    //         email: values.email,
    //         password: values.password,
    //         callbackUrl: "/"
    //     })

    //     if(status.ok) router.push(status.url)
        
    // }

    // // Google Handler function
    // async function handleGoogleSignin(){
    //     signIn('google', { callbackUrl : "http://localhost:3000"})
    // }

    // // Github Login 
    // async function handleGithubSignin(){
    //     signIn('github', { callbackUrl : "http://localhost:3000"})
    // }

    return (
        <>

            <Head>
            <title></title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
        
            <section className='flex flex-col items-center justify-center min-h-screen md:min-h-fit py-10 bg-grey-100'>
                <main className="flex flex-col items-center justify-center w-full flex-1 px-2  md:max-w-4xl md:px-20 lg:2/3 text-center">

                    <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row justify-center">

                    <div className="w-full p-1 md:p-5">
                        <div className="text-left text-2xl font-bold hidden md:block">
                        
                        </div>

                        <div className="py-10">
                        <SignIn/>
                        </div>
                    </div>

                    <div className="w-full md:w-4/5 flex flex-col justify-center items-center bg-green-800 text-white rounded-2xl md:rounded-tr-2xl md:rounded-br-2xl py-36 px-10 gap-5">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to  Family</h2>
                        <div className="border-2 w-10 border-white mb-2" />
                        <p className="mb-10">Fill up the information and start the journey with us...</p>
                    <button type="button" className="border-2 border-white rounded-full px-12 py-2 inline-block font-bold bg-white text-green-800 hover:bg-green-800 hover:text-white">
                    <Link href="/register">Sign Up</Link>
                    </button>
                    </div>

                    </div>

                </main>
            </section>

        </>
    )
}