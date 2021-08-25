import { emailService } from '../services/email-service.js'

export function EmailCompose({ userComposer, onCreateNewEmail }) {
    let email = {
        composer: emailService.getLoggedUser().email,
        reciver: '',
        body: '',
        subject: ''
    }



    const sendEmail = () => {
        const { subject, body, composer, reciver } = email

        emailService.createEmail(subject, body, 'sent', composer, reciver)





    }
    const handleChange = (ev) => {

        switch (ev.target.name) {
            case 'text-reciver':
                email.reciver = ev.target.value
                break;
            case 'text-input':
                email.body = ev.target.value
                break;
            case 'text-subject':
                email.subject = ev.target.value
                break;

        }

    }

    return (
        <section className="email-compose">
            <section className="email-details">
                <div className="email-details-header">
                    <h2 className="email-new-msg">new message</h2>
                    <div className="details-back" onClick={() => { onCreateNewEmail() }}>X</div>
                </div>
                <div className="details-composer">
                    <h2 className="composer-email">from: {userComposer.email}</h2>
                </div>
                <form className="email-metadata compose">
                    <div className="compose-subject">
                        <h2>to:</h2><input name="text-reciver" className="email-input" onChange={handleChange} />
                    </div>
                    <div className="compose-reciever">
                        <h2>subject:</h2><input name="text-subject" className="email-input" onChange={handleChange} />
                    </div>

                    <div className="compose-body">
                        <textarea name="text-input" className="compose-input" type="text" placeholder="enter text here" onChange={handleChange}></textarea>
                        {/* <p>{email.body}</p> */}
                    </div>
                </form>
                <button onClick={() => { sendEmail() }}>send email</button>
            </section >

        </section>
    )

}
// const {date, time} = utilService.getFormattedDateNTime(email.sentAt)
{/* <h2 className="time">{`${time} ${date}`}</h2> */ }