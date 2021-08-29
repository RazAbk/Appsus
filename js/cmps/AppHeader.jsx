const { NavLink, withRouter } = ReactRouterDOM
import { emailService } from '../apps/Email/services/email-service.js'
import { eventBusService } from '../services/event-bus-service.js'

class _AppHeader extends React.Component {

  state = {
    unReadEmails: 0
  }

  removeEventBus;

  componentDidMount() {
    const unReadEmails = emailService.getUnReadEmailsCount();
    this.setState({ unReadEmails })
    
    this.removeEventBus = eventBusService.on('update-unread-emails', (unReadEmails) => {
        this.setState({unReadEmails})
    })
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  render() {

    const {unReadEmails} = this.state;

    return (
        <div className="header main-layout">
            <div className="logo">
              <NavLink to ="/" ><img src="./assets/img/logo.svg"></img></NavLink>
            </div>
            <nav className="nav-bar">
              <NavLink activeClassName="my-active" exact to='/' ><i title="homepage" className="fas fa-home"></i></NavLink>
              <NavLink to ="/email" ><i title="email" className="far fa-envelope"></i>{ unReadEmails !== 0 && <span className="unread-emails">{unReadEmails}</span>}</NavLink>
              <NavLink to ="/notes" ><i title="notes" className="far fa-sticky-note"></i></NavLink>
              <NavLink to ="/about" ><i title="about" className="fas fa-info-circle"></i></NavLink>
            </nav>
        </div>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)