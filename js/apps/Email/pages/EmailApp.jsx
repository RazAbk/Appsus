import { Screen } from '../../../cmps/Screen.jsx';
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { EmailCompose } from '../cmps/EmailCompose.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';



export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isNewEmail: false,
        checkedEmails: []
    }

    componentDidMount() {
        this.loadEmails();
    }

    componentWillUnmount() {
        emailService.cleanAllCheckedEmails();
    }

    loadEmails = () => {
        const emails = emailService.query(this.state.filterBy).then(emails => {
            this.setState({ emails, checkedEmails: emails.filter(email => email.isChecked) });
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

        if (!thisFilterBy) {
            thisFilterBy = {
                folder,
                searchTxt: '',
                isRead: false,
                isStared: false,
            }
        } else {
            thisFilterBy = { ...thisFilterBy, folder: folder }

        }

        this.setState({ ...this.state, filterBy: thisFilterBy }, this.loadEmails)
    }

    onEmailReadToggle = (emailId) => {
        emailService.toggleEmailRead(emailId);
        eventBusService.emit('update-unread-emails', emailService.getUnReadEmailsCount());
        this.loadEmails();
    }

    onEmailStarToggle = (emailId) => {
        emailService.toggleEmailStar(emailId);
        this.loadEmails();
    }

    onCheckEmail = (emailId) => {
        emailService.toggleCheckEmailById(emailId);
        this.loadEmails();
    }

    onCheckAllEmails = (isChecked) => {
        emailService.toggleCheckAllEmails(this.state.filterBy, isChecked);
        this.loadEmails();
    }

    onCreateNewEmail = (isOn) => {
        this.setState({ isNewEmail: isOn })
    }
    
    onMoveEmail= (emailId, folder) => {
        emailService.moveFolder(emailId, folder);
        this.loadEmails()
    }

    render() {

        const { emails, selectedEmail, isNewEmail } = this.state;
        if (!emails) return <h1>Loading...</h1>

        return (
            <div className="email-app main-layout">
                    <React.Fragment>
                        <Screen isOpen={selectedEmail} closeModal={this.onSelectedEmail} />
                        <Screen isOpen={isNewEmail} closeModal={this.onCreateNewEmail} />
                    </React.Fragment>
                <div className="email-layout">
                    <div className="emails-left-layout">
                        <nav className="email-folders">
                            <i className="fas fa-plus new-compose" onClick={() => this.onCreateNewEmail(true)}></i>
                            <i className="far fa-envelope" onClick={() => { this.onSetFolderFilter('inbox') }}></i>
                            <i className="far fa-star" onClick={() => { this.onSetFolderFilter('starred') }}></i>
                            <i className="far fa-paper-plane" onClick={() => { this.onSetFolderFilter('sent') }}></i>
                            <i className="fas fa-trash-alt" onClick={() => { this.onSetFolderFilter('trash') }}></i>
                            <i className="far fa-sticky-note" onClick={() => { this.onSetFolderFilter('drafts') }}></i>
                        </nav>
                    </div>

                    <div className="emails-right-layout">
                        <div className="email-filter">
                            <EmailFilter onSetFilter={this.onSetFilter} currentFolder={this.state.filterBy ? this.state.filterBy.folder : 'inbox'} />
                        </div>
                        <EmailList emails={emails} onSelectedEmail={this.onSelectedEmail} onCheckEmail={this.onCheckEmail} onCheckAllEmails={this.onCheckAllEmails} onMoveEmail={this.onMoveEmail} checkedEmails={this.state.checkedEmails} emailReadToggle={this.onEmailReadToggle} emailStarToggle={this.onEmailStarToggle}/>

                    </div>
                    {selectedEmail && <EmailDetails email={selectedEmail} onSelectedEmail={this.onSelectedEmail} />}
                    {isNewEmail && <EmailCompose userComposer={emailService.getLoggedUser()} onCreateNewEmail={this.onCreateNewEmail} />}
                </div>
            </div>
        )
    }
}