import { emailService } from '../services/email-service.js';
import { eventBusService } from '../../../services/event-bus-service.js';
import { Screen } from '../../../cmps/Screen.jsx';

export function EmailCompose({ draftToEdit, userComposer, onCreateNewEmail, isOpen, onSelectedEmail }) {

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
    let draft;
    if(draftToEdit){
        const { receiver, body, subject } = draftToEdit;
        email = {...email, receiver, body, subject }
    } else{
        draft = null;
    }

    let draftInterval = setInterval(() => {
        _saveDraft();
    }, 5000);
    
    const _saveDraft = () => {
        draft = email;
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
        _saveDraft();
    }

    // Send email
    const sendEmail = () => {
        if(draftToEdit){
            email = draft;
            console.log(draft)
        }
        const { composer , subject, body, receiver } = email;

        if(!subject || !body || !receiver){
            eventBusService.emit('user-msg', {txt:'Fill all fields!', type:'message', time: 2000})
            return;
        } else{
            if(draftToEdit){
                const { composer , receiver, body, subject } = draft;
                draft = {...draftToEdit, composer, receiver, body, subject }
                emailService.draftToMail(draftToEdit.id, draft);
            }else{
                emailService.createEmail(subject, body, 'sent', composer , receiver);
            }
        }
        onCreateNewEmail(false);
        if(draftToEdit){
            onSelectedEmail(null);
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
                            to:<input name="text-receiver" className="email-input" defaultValue={draftToEdit ? draftToEdit.composer : ''} autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="compose-subject">
                            subject:<input name="text-subject" className="email-input" defaultValue={draftToEdit ? draftToEdit.subject : ''} autoComplete="off" onChange={handleChange} />
                        </div>

                        <div className="compose-body">
                            <textarea name="text-input" className="compose-input" type="text" defaultValue={draftToEdit ? draftToEdit.body : ''} placeholder="enter text here" onChange={handleChange}></textarea>
                        </div>
                    </form>
                    <button onClick={() => { sendEmail() }} className="send-email-btn">Send</button>
                </section >
            </section>
        </React.Fragment>
    )
}
