import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, onSelectedEmail, onCheckEmail, onCheckAllEmails, onTrashEmail }) {

    return (
        <div className="emails-body">
            <div className="emails-func">

                <div className="func-left">
                    <label htmlFor="checked-all-emails" ></label>
                    <input type="checkbox" name="checked-all-emails" className="email-checkbox" onChange={(ev) => {onCheckAllEmails(ev.nativeEvent.target.checked)}} />
                    <i className="fas fa-sync-alt refresh"></i>
                </div>

                <div className="func-right">
                    <select name="filter" >
                        <option value="name"></option>
                    </select>
                </div>
            </div>


            <div className="emails-list">

                <div className="emails-sort">
                    <div className="sort-selected">
                    <i className="far fa-star"></i>
                    </div>
                    <div className="sort-starred">

                    </div>
                    <div className="sort-composer-receiver">

                    </div>

                </div>
                {emails.map(email => <EmailPreview key={email.id} email={email}
                                                    onSelectedEmail={onSelectedEmail}
                                                    onCheckEmail={onCheckEmail}
                                                    trashEmail={onTrashEmail}
                                    />)}
            </div>

        </div>
    )
}
