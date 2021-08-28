import { Screen } from '../../../cmps/Screen.jsx';
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { EmailCompose } from '../cmps/EmailCompose.jsx';
import { EmailDraftEdit } from '../cmps/EmailDraftEdit.jsx'
import { eventBusService } from '../../../services/event-bus-service.js';



export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isNewEmail: false,
        draft: null,
        checkedEmails: [],
        isNavBarExpand: false
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
        const isStared = folder === 'starred' ? true : false;

        if (!thisFilterBy) {
            thisFilterBy = {
                folder,
                searchTxt: '',
                isRead: false,
                isStared: isStared,
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
        this.setState({ isNewEmail: isOn });
    }

    onDraftEdit = (inOn) => {
        this.setState({ draft: inOn});
        this.loadEmails();
    }

    onSetDraft = (email) => {
        this.setState( {draft: email });
    }
    
    onMoveEmail= (emailId, folder) => {
        const emailFolder = emailService.getEmailFolder(emailId)

        if(folder === 'trash' && emailFolder === 'trash' ){
            eventBusService.emit('user-msg', {txt:`email deleted`, type:'message', time: 2000})
        } else{
            eventBusService.emit('user-msg', {txt:`moved to ${folder}`, type:'message', time: 2000})
        }
        
        emailService.moveFolder(emailId, folder);
        this.loadEmails()
    }

    onFoldersNavChange = (isOn) => {
        if(isOn){
            this.setState({isNavBarExpand: true})
        } else{
            this.setState({isNavBarExpand: false})
        }
    }

    render() {

        const { emails, selectedEmail, isNewEmail, draft, isNavBarExpand } = this.state;
        if (!emails) return <h1>Loading...</h1>

        return (
            <div className="email-app main-layout">
                    <React.Fragment>
                        <Screen isOpen={selectedEmail} closeModal={this.onSelectedEmail} />
                    </React.Fragment>
                <div className="email-layout">
                    <div className="emails-left-layout">
                        <nav className="email-folders" onMouseEnter={()=>{this.onFoldersNavChange(true)}} onMouseLeave={()=>{this.onFoldersNavChange(false)}}>
                            {isNavBarExpand ? <i className="folder-content fas fa-plus new-compose" onClick={() => this.onCreateNewEmail(true)}><span>new email</span></i>
                            : <i className="folder-content fas fa-plus new-compose" onClick={() => this.onCreateNewEmail(true)}></i> }

                            {isNavBarExpand ? <i className="folder-content far fa-envelope" onClick={() => { this.onSetFolderFilter('inbox') }}><span>inbox</span></i>
                            : <i className="folder-content far fa-envelope" onClick={() => { this.onSetFolderFilter('inbox') }}></i> }

                            {isNavBarExpand ? <i className="folder-content far fa-star" onClick={() => { this.onSetFolderFilter('starred') }}><span>starred</span></i>
                            : <i className="folder-content far fa-star" onClick={() => { this.onSetFolderFilter('starred') }}></i> }

                            {isNavBarExpand ? <i className="folder-content far fa-paper-plane" onClick={() => { this.onSetFolderFilter('sent') }}><span>sent</span></i>
                            : <i className="folder-content far fa-paper-plane" onClick={() => { this.onSetFolderFilter('sent') }}></i> }

                            {isNavBarExpand ? <i className="folder-content fas fa-trash-alt" onClick={() => { this.onSetFolderFilter('trash') }}><span>trash</span></i>
                            : <i className="folder-content fas fa-trash-alt" onClick={() => { this.onSetFolderFilter('trash') }}></i> }

                            {isNavBarExpand ? <i className="folder-content far fa-sticky-note" onClick={() => { this.onSetFolderFilter('drafts') }}><span>drafts</span></i>
                            : <i className="folder-content far fa-sticky-note" onClick={() => { this.onSetFolderFilter('drafts') }}></i> }
                    </nav>
                    </div>

                    <div className="emails-right-layout">
                        <div className="email-filter">
                            <EmailFilter onSetFilter={this.onSetFilter} currentFolder={this.state.filterBy ? this.state.filterBy.folder : 'inbox'} />
                        </div>
                        <EmailList emails={emails} onSelectedEmail={this.onSelectedEmail} onCheckEmail={this.onCheckEmail} onCheckAllEmails={this.onCheckAllEmails} onMoveEmail={this.onMoveEmail} checkedEmails={this.state.checkedEmails} emailReadToggle={this.onEmailReadToggle} emailStarToggle={this.onEmailStarToggle} onSetDraft={this.onSetDraft}/>

                    </div>
                    {selectedEmail && <EmailDetails email={selectedEmail} onSelectedEmail={this.onSelectedEmail} />}
                    {isNewEmail && <EmailCompose userComposer={emailService.getLoggedUser()} onCreateNewEmail={this.onCreateNewEmail} draftInterval={this.state.draftInterval} isOpen={isNewEmail} />}
                    {draft && <EmailDraftEdit onDraftEdit={this.onDraftEdit} draft={this.state.draft} /> }
                </div>
            </div>
        )
    }
}