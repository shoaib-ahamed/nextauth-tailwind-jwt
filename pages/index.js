import { getSession, signOut, useSession } from "next-auth/react"
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

export default function Home() {

  const { data: session } = useSession()

  const [state , dispatch] = useContext(DataContext)

  const { auth  } = state

  function handleSignOut(){
    signOut()
  }

  return (
    <div className="">
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut , auth }) : Guest()}
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, auth }){

  console.log('auth : ' , auth);

  return(
    <main className="container flex w-full h-90vh justify-center text-center gap-10">
          <div>

            
            { Object.keys(auth).length === 0 ? 
                    <h5 className="text-2xl mt-10">Hello , {session.user.name}. </h5>
                    : 
                    <div className="mt-10">
                      <h5 className="text-2xl">Hello , {auth.user.name}.</h5>
                      <h5 className="text-2xl">Phone : {auth.user.phone} </h5>
                    </div>
                    }
                    <h3 className="text-xl">Welcome to Nesoi family.</h3>           
          </div>
      </main>
  )
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}