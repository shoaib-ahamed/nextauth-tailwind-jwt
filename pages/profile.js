import { getSession } from 'next-auth/react';

import React from 'react';

const profile = () => {
  return (
    <div className="flex h-screen justify-center items-center" >profile</div>
  )
}



export async function getServerSideProps({ req }){
    const session = await getSession({ req })

    if(!session){
        return {
            redirect : {
                destination : "/login",
                premanent: false
            }
        }
    }
    // authorize user return session
    return {
        props: { session }
    }
}

export default profile