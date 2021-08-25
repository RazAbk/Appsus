import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
    }

    componentDidMount(){
        this.loadEmails();
    }

    loadEmails = () => {
        const emails = emailService.query().then(emails => {
            this.setState({emails});
        })
    }

    render(){

        const {emails} = this.state;
        if(!emails || emails.length === 0) return <h1>Loading...</h1>

        return(
            <div className="email-app">
                <div className="emails-left-layout">
                    <nav className="email-folders">
                        <div className="new-compose">+</div>
                        <div className="inbox">inbox</div>
                        <div className="starred">starred</div>
                        <div className="sent">sent</div>
                        <div className="trash">trash</div>
                        <div className="drafts">drafts</div>
                    </nav>
                </div>

                <div className="emails-right-layout">
                    <div className="email-filter">
                        <input type="text" />
                    </div>
                    <EmailList emails={emails} />
                </div>
            </div>
        )
    }
}