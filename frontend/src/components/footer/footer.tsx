import React from 'react'
import styles from './footer.module.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Link from 'next/dist/client/link'

const Footer = () => {
    return (

        <Box className={styles.footer} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr 2fr', gap: '160px' }}>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <Typography className={styles.footerHead}>ABOUT</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <Typography className={styles.footerHead}>GROUP COMPANIES</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>

            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <Typography className={styles.footerHead}>HELP</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>

            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <Typography className={styles.footerHead}>CONSUMER POLICY</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px', paddingLeft: '24px', borderLeft: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography className={styles.footerHead}>Mail Us:</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <Typography className={styles.footerHead}>Registered Office Address:</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Contact Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Careers
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Flipkart Stories
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Press
                        </Link>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="" className={styles.footerLink}>
                            Corporate Information
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Box>

    )
}

export default Footer