import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { Screen } from '../../../cmps/Screen.jsx';


export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
    }

    componentDidMount() {
        this.loadEmails();
    }

    componentWillUnmount() {
        emailService.cleanAllCheckedEmails();
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
    
    onSetFolderFilter = (folder) => {
        let thisFilterBy = this.state.filterBy;

        if(!thisFilterBy){
            thisFilterBy = {
                folder,
                searchTxt: '',
                isRead: false,
                isStared: false,
            }
        } else {
            thisFilterBy = {...thisFilterBy, folder: folder}

        }
        
        this.setState({...this.state, filterBy: thisFilterBy}, this.loadEmails)
    }

    onCheckEmail = (emailId) => {
        emailService.toggleCheckEmailById(emailId);
    }

    onCheckAllEmails = (isChecked) => {
        emailService.toggleCheckAllEmails(this.state.filterBy, isChecked);
        this.loadEmails();
    }

    render() {

        const { emails, selectedEmail } = this.state;
        if (!emails) return <h1>Loading...</h1>

        return (
            <div className="email-app main-layout">
                <Screen isOpen={this.state.selectedEmail} closeModal={this.onSelectedEmail} />
                <div className="emails-left-layout">
                    <nav className="email-folders">
                        <i className="fas fa-plus new-compose"></i>
                        <div className="inbox" onClick={() => {this.onSetFolderFilter('inbox')}}>inbox</div>
                        <div className="starred" onClick={() => {this.onSetFolderFilter('starred')}}>starred</div>
                        <div className="sent" onClick={() => {this.onSetFolderFilter('sent')}}>sent</div>
                        <div className="trash" onClick={() => {this.onSetFolderFilter('trash')}}>trash</div>
                        <div className="drafts" onClick={() => {this.onSetFolderFilter('drafts')}}>drafts</div>
                    </nav>
                </div>

                <div className="emails-right-layout">
                    <div className="email-filter">
                        <EmailFilter onSetFilter={this.onSetFilter} currentFolder={this.state.filterBy ? this.state.filterBy.folder : 'inbox'}/>
                    </div>
                    <EmailList emails={emails} onSelectedEmail={this.onSelectedEmail} onCheckEmail={this.onCheckEmail} onCheckAllEmails={this.onCheckAllEmails} />

                </div>
                {selectedEmail && <EmailDetails email={selectedEmail} onSelectedEmail={this.onSelectedEmail} />}
            </div>
        )
    }
}