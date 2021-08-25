import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';


export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
    }

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        const emails = emailService.query(this.state.filterBy).then(emails => {
            this.setState({ emails });
        })
    }
    onSelectedEmail = (email) => {
        this.setState({ selectedEmail: email })
    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    render() {

        const { emails, selectedEmail } = this.state;
        if (!emails) return <h1>Loading...</h1>

        return (
            <div className="email-app main-layout">
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
                        <EmailFilter onSetFilter={this.onSetFilter} />
                    </div>
                    <EmailList emails={emails} onSelectedEmail={this.onSelectedEmail} />

                </div>
                {selectedEmail && <EmailDetails email={selectedEmail} onSelectedEmail={this.onSelectedEmail} />}
            </div>
        )
    }
}