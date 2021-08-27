import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "../../../cmps/LongTxt.jsx"

export function EmailPreview({ email, onSelectedEmail, onCheckEmail, moveEmail, emailReadToggle }) {

    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)

    return (
        <div className={`email-preview ${(email.isRead ? '': 'email-unread')}`} onClick={(ev) => {onSelectedEmail(email); (!email.isRead && emailReadToggle(email.id))}}>
            <div className="email-left">
                <label htmlFor="checked-email"  ></label>
                {email.isChecked && <input type="checkbox" name="checked-email"  onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" checked />}
                {!email.isChecked && <input type="checkbox" name="checked-email"  onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" />}
                <i className="far fa-star"></i>
                <p>{email.composer}</p>
            </div>
            <div className="email-center">
                <LongTxt text={email.subject} maxSize={60} />
            </div>
            <div className="email-right">
                <p>{`${time} ${date}`}</p>
                <div onClick={(ev)=>{ev.stopPropagation() ;emailReadToggle(email.id)}} className="email-read-envelope">
                    {email.isRead ? <i className="far fa-envelope-open"></i> : <i className="fas fa-envelope"></i>}
                </div>
                <i onClick={(ev) => {ev.stopPropagation(); moveEmail(email.id, 'trash');}} className="fas fa-trash-alt email-trash"></i>
            </div>
        </div>
    )
}
