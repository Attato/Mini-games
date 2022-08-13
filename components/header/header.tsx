import React from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const Header = ( ) => {
    return(
        <>
            <header className={styles.header} id="header">
                <div className={styles.main}>
                    <span className={styles.social__links}>
                        <Link href="https://vk.com/qwaqwakva"><a target="blank"><Image src="/vk.svg" alt="" width={20} height={20}/></a></Link>
                        <Link href="https://t.me/qwaqwakwa"><a target="blank"><Image src="/telegram.svg" alt="" width={20} height={20}/></a></Link>
                        <Link href="https://github.com/Attato"><a target="blank"><Image src="/github.svg" alt="" width={20} height={20}/></a></Link>

                    </span>
                    <h1 className={styles.logo}><Link href="https://portfolio-attato.vercel.app/"><a>Attato</a></Link></h1>
                    <div className={styles.mail}><Link href="mailto:rde8519@mail.ru"><a>rde8519@mail.ru</a></Link></div>
                    <div className={styles.mobile__mail}><Link href="mailto:rde8519@mail.ru"><a>@mail</a></Link></div>
                </div>
            </header>
        </>
    );
}

export default Header;