import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../style/styles'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import ProfileContnet from '../components/Profile/ProfileContnet.jsx'


const ProfilePage = () => {
    const [active,setActive]= useState(1)
  return (
 <>
       <Header/>
       <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
       <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
        <ProfileSidebar active={active} setActive={setActive} />
       </div>
       <ProfileContnet  active={active} setActive={setActive} />
        
       </div>
 </>

  )
}

export default ProfilePage