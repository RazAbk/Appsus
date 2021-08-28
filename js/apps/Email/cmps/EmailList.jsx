import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, onSelectedEmail, onCheckEmail, onCheckAllEmails, onMoveEmail, checkedEmails, emailReadToggle, emailStarToggle, onSetDraft }) {

    return (
        <div className="emails-body">
            <div className="emails-func">

                <div className="func-left">
                    <label htmlFor="checked-all-emails" ></label>
                    <input title="mark all emails" type="checkbox" name="checked-all-emails" className="email-checkbox" onChange={(ev) => {onCheckAllEmails(ev.nativeEvent.target.checked)}} />
                </div>

                <div className="func-right">
                    {(checkedEmails.length > 0) && 
                        <React.Fragment>
                            <h3>move to:</h3>
                            <select name="filter" onChange={(ev)=>{checkedEmails.map(email=>{onMoveEmail(email.id, ev.target.value)})}}>
                                <option value="inbox"></option>
                                <option value="inbox">inbox</option>
                                <option value="trash">trash</option>
                            </select>
                        </React.Fragment>
                    }
                </div>
            </div>


            <div className="emails-list">
                {emails.map(email => <EmailPreview key={email.id} email = {email}
                                                    onSelectedEmail = {onSelectedEmail}
                                                    onCheckEmail = {onCheckEmail}
                                                    moveEmail = {onMoveEmail}
                                                    emailReadToggle = {emailReadToggle}
                                                    emailStarToggle = {emailStarToggle}
                                                    onSetDraft = {onSetDraft}
                                    />)}
            </div>

        </div>
    )
}
