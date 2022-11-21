// import { FiMoon, FiSun } from ' react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';


const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [mounted , setMounted] = useState(false);

    const session = useSession()


    useEffect(() => {
      setMounted(true)
    },[])

    // const {systemTheme , theme , setTheme} = useTheme()


    // const RenderThemeChanger = () => {
    //   if(!mounted) return null;
    //   const currentTheme = theme === 'system' ? systemTheme : theme;

    //   if (currentTheme === 'dark'){
    //     return (
    //       <div onClick={setTheme('light')}>dark</div>
    //     )
    //   }else {
    //     return (
    //       <div onClick={setTheme('dark')}>light</div>
    //     )
    //   }
    // }
    
  return (
    <div className="flex items-center justify-between border-b border-green-800 py-6 px-12">
      <Link href="/"><a className="text-3xl"> <span className="text-green-800">LOGO</span></a></Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8" 
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-green-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-center gap-6 min-h-screen">
              <li className="border-b border-green-800 my-2 uppercase">
                <a href="/about">About</a>
              </li>
              <li className="border-b border-green-800 my-2 uppercase">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="border-b border-green-800 my-2 uppercase">
                <a href="/contact">Contact</a>
              </li>
              {(session.data) ? <li> <button onClick={() => signOut()} className="bg-green-800 text-white px-5 py-3"><VscSignOut/></button>
              </li> : <></>}
              {/* <li>
                <RenderThemeChanger/>
              </li> */}
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 items-center justify-center lg:flex">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          {(session.data) ? <li> <button onClick={() => signOut()} className="bg-green-800 text-white px-5 py-3"><VscSignOut/></button>
              </li> : <></>}
          {/* <li>
            <RenderThemeChanger/>
          </li> */}
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 30%;
        height: 100vh;
        top: 0;
        right: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>

  )
}

export default Navbar