
// import styles from '../styles/Layout.module.css';

import { useSession } from "next-auth/react";
import Notify from "../components/Notify";
import Sidebar from "../components/Sidebar";



export default function Layout( { children }){
    const { data: session } = useSession()

    return (
        <>
            <Notify className="absolute top-0 right-1 z-50"/>
            <div className="flex w-full">
                
                {(session) ? <Sidebar className='w-96'/> : null }
                <div className="w-full">
                {children}
                </div>
            </div>
        </>
    )
}


{/* <div className={styles.imgStyle}>
                        <div className={styles.cartoonImg}></div>
                        <div className={styles.cloud_one}></div>
                        <div className={styles.cloud_two}></div>
                    </div> */}