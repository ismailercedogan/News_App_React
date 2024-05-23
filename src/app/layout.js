'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';
import styles from './styles/Navbar.module.css';
import Image from 'next/image';
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>
          <Navbar color="dark" dark expand="md" className={styles.navbar}>
            <NavItem className={styles.logo}>
              <NavLink href="/" > <Image src="/images/logo.png" alt="Galatasaray Logo" width={100} height={50}/> 
              </NavLink> 
            </NavItem>
            <Nav className={styles.navigation} navbar>
              <NavItem>
                  <NavLink href="/" className={styles.navLink}>Latest News</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/highlights" className={styles.navLink}>Highlights</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/live_score" className={styles.navLink}>Live Score</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/social" className={styles.navLink}>Social</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/match_schedule" className={styles.navLink}>Match Schedule</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/user_profile" className={styles.navLink}>
                  <Image
                      src="/images/user_profile.png"
                      alt="User Profile"
                      width={50}
                      height={50}
                      className={styles.userProfile}
                    />
                  </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </header>
        {children}
        <footer><p>info@galatasary_news.com</p></footer>
      </body>
    </html>
  );
}
