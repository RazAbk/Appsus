import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "../../../cmps/LongTxt.jsx"

export function EmailPreview({ email, onSelectedEmail, onCheckEmail }) {

    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)

    return (
        <div className="email-preview" onClick={() => { onSelectedEmail(email) }}>
            <div className="email-left">
                <label htmlFor="checked-email"  ></label>
                {email.isChecked && <input type="checkbox" name="checked-email"  onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" checked />}
                {!email.isChecked && <input type="checkbox" name="checked-email"  onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" />}
                <div>🟡</div>
                <p>{email.composer}</p>
            </div>
            <div className="email-right">
                <LongTxt text={email.subject} maxSize={60} />
                <p>{`${time} ${date}`}</p>
                <div>⬜</div>
                <div>🟡</div>
            </div>
        </div>
    )
}
