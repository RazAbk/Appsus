import { emailService } from '../services/email-service.js';
import { eventBusService } from '../../../services/event-bus-service.js';
import { Screen } from '../../../cmps/Screen.jsx';

export function EmailCompose({ userComposer, onCreateNewEmail, isOpen }) {

    // EventBus for draft confirm message
    let removeEventBus = eventBusService.on('user-answer', (answer) => {
        if(answer === 'yes'){
            const { subject, body, composer, receiver } = draft;
            emailService.createEmail(subject ? subject : '', body ? body : '', 'drafts', composer, receiver ? receiver : '');
        }

        clearEventBus();
        onCreateNewEmail(false);
        clearInterval(draftInterval);
    });
    
    const clearEventBus = () => {
        removeEventBus();
    }

    let email = {
        composer: emailService.getLoggedUser().email,
        receiver: '',
        body: '',
        subject: ''
    }

    // Draft
    var draft = null;
    var isDraftUpToDate = true;

    var draftInterval = setInterval(() => {
        _saveDraft();
    }, 3000);
    
    const _saveDraft = () => {
        if(isDraftUpToDate) return;
        draft = email;
        isDraftUpToDate = true;
    }

    // When exit from the edit mode
    const exitEditMode = () => {
        eventBusService.emit('user-msg', {txt:'Save draft before exit?', type:'confirm', time: 1000*999999})
    }

    

    // Handle input changes
    const handleChange = (ev) => {
        
        switch (ev.target.name) {
            case 'text-receiver':
                email.receiver = ev.target.value
                break;
            case 'text-input':
                email.body = ev.target.value
                break;
            case 'text-subject':
                email.subject = ev.target.value
                break;
        }
        isDraftUpToDate = false;
        _saveDraft();
    }

    // Send email
    const sendEmail = () => {
        const { subject, body, composer, receiver } = email;

        if(!subject || !body || !receiver){
            eventBusService.emit('user-msg', {txt:'Fill all fields!', type:'message', time: 2000})
            return;
        } else{
            emailService.createEmail(subject, body, 'sent', composer, receiver);
            onCreateNewEmail(false)
        }
    }

    return (
        <React.Fragment>
            <Screen isOpen={isOpen} closeModal={() => {exitEditMode()}} />
            <section className="email-compose">
                <section className="email-details">
                    <div className="email-details-header">
                        <h2 className="email-new-msg">new message</h2>
                        <div className="details-back" onClick={() => {exitEditMode()}}>X</div>
                    </div>
                    <div className="details-composer">
                        <h2 className="composer-email">from: {userComposer.email}</h2>
                    </div>
                    <form className="email-metadata compose">
                        <div className="compose-receiver">
                            to:<input name="text-receiver" className="email-input" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="compose-subject">
                            subject:<input name="text-subject" className="email-input" autoComplete="off" onChange={handleChange} />
                        </div>

                        <div className="compose-body">
                            <textarea name="text-input" className="compose-input" type="text" placeholder="enter text here" onChange={handleChange}></textarea>
                        </div>
                    </form>
                    <button onClick={() => { sendEmail() }} className="send-email-btn">Send</button>
                </section >
            </section>
        </React.Fragment>
    )
}