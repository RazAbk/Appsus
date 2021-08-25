export function EmailDetails({ email, onSelectedEmail }) {

    return <section className="email-details">
        <div className="details-subject">{email.subject}</div>
        <div className="header-details">
            <div className="details-composer">compo{email.composer}</div>

            <div className="details-sentAt">{email.sentAt}</div>
        </div>
        <div className="details-body">{email.body}</div>
        <div className="details-back" onClick={() => { onSelectedEmail(null) }}>X</div>

    </section >









}