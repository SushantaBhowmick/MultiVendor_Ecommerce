import React from 'react'
import styles from '../../style/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'


const Navbar = ({active}) => {
  return (
  <>
    <div className={`block 800px:${styles.noramlFlex} `}>
        {
            navItems && navItems.map((i,index)=>(
                <div className="flex" key={index}>
                    <Link to={i.url}
                    className={`${active===index+1? "text-[#17dd1f]":"text-black 800px:text-[#fff]"} font-[500] px-6 800px:pb-0 cursor-pointer pb-[30px]`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
        }
    </div>
  </>
  )
}

export default Navbar