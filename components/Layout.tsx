import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap'
import classes from '*.module.css'
import logout from '../ordercloud/redux/ocAuth/logout'
import { useOcDispatch, useOcSelector } from '../ordercloud/redux/ocStore'

const Layout: FunctionComponent = ({ children }) => {
  const dispatch = useOcDispatch()

  const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
    user: s.ocUser.user,
    loading: s.ocAuth.loading,
    isAnonymous: s.ocAuth.isAnonymous,
    lineItemCount: s.ocCurrentOrder.order ? s.ocCurrentOrder.order.LineItemCount : 0,
  }))

  return (
    <>
      <Head>
        <title>React Headstart</title>
        <link rel="icon" href="/cool-doge.gif" type="image/gif" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home" className="position-relative">
              <Image src="/headstart.png" alt="React Headstart" height="auto" width={150} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
              <Nav className="mr-auto">
                <Link href="/" passHref>
                  <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href="/products" passHref>
                  <Nav.Link>Products</Nav.Link>
                </Link>
              </Nav>
              {isAnonymous ? (
                <Link href="/login" passHref>
                  <Button className="btn btn-primary">Login</Button>
                </Link>
              ) : (
                <button type="button" disabled={loading} onClick={() => dispatch(logout())}>
                  Logout
                </button>
              )}
              {!isAnonymous && user && <p>{`${user.FirstName} ${user.LastName}`}</p>}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
