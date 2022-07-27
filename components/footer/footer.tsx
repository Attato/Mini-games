import React from 'react'
import styles from './footer.module.scss'

const Footer = ( ) => {
    return(
        <>
            <footer className={styles.footer}>
                <h1>Attato</h1>
                <span>Copyright © Attato {new Date().getFullYear()}. All rights reserved.</span>
            </footer>
        </>
    );
}

export default Footer;