import { utilService } from "../../../services/util.service.js"

export function EmailPreview({ email, onSelectedEmail }) {

    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)

    return (
        <div className="email-preview" onClick={() => { onSelectedEmail(email) }}>
            <div className="email-left">
                <div>⬜</div>
                <div>🟡</div>
                <p>{email.composer}</p>
            </div>
            <div className="email-right">
                <p>{email.subject}</p>
                <p>{`${time} ${date}`}</p>
                <div>⬜</div>
                <div>🟡</div>
            </div>
        </div>
    )
}
