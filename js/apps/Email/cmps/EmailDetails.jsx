import { emailService } from "../services/email-service.js"
import { utilService } from "../../../services/util.service.js"

export function EmailDetails({ email, onSelectedEmail }) {
    
    const {date, time} = utilService.getFormattedDateNTime(email.sentAt)

    return <section className="email-details">
                <div className="email-details-header">
                    <h2>{email.subject}</h2>
                    <div className="details-back" onClick={() => { onSelectedEmail(null) }}>X</div>
                </div>
                <div className="email-metadata">
                    <h3>{(emailService.isUserTheComposer(email.composer) ? 'To: ' : 'From: ') + email.receiver}</h3>
                    <h2 className="time">{`${time} ${date}`}</h2>
                </div>
                <div className="email-body">
                    <p>{email.body}</p>
                </div>
            </section >

}
