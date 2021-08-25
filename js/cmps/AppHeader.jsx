const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  render() {

    return (
        <div className="header main-layout">
            <div className="logo">
                <h1>Appsus</h1>
            </div>
            <nav className="nav-bar">
                    <NavLink activeClassName="my-active" exact to='/' >Home</NavLink>
                    <NavLink to ="/email" >Email</NavLink>
                    <NavLink to ="/notes" >Notes</NavLink>
                    <NavLink to ="/books" >Books</NavLink>
                    <NavLink to ="/about" >About</NavLink>
            </nav>
        </div>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)