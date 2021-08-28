import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const emailService = {
    createEmail,
    getLoggedUser,
    query,
    isUserTheComposer,
    toggleCheckEmailById,
    cleanAllCheckedEmails,
    toggleCheckAllEmails,
    moveFolder,
    deleteEmail,
    toggleEmailRead,
    toggleEmailStar,
    getUnReadEmailsCount,
    draftToMail,
    saveDraft
}

const EMAIL_KEY = 'emailsDB'
const gEmails = storageService.loadFromStorage(EMAIL_KEY) || [{
        id: utilService.makeId(4),
        subject: 'About out business trip',
        body: `And mentioned me to sell you a present of everything I've said as yet.' 'A cheap sort of a well--' 'What did they live at the corners: next the ten courtiers; these were all ornamented with hearts. Next came an angry tone, 'Why, Mary Ann, and be turned out of breath, and till the puppy's bark sounded quite faint in the world you fly, Like a tea-tray in the wood, 'is to grow larger again, and the Queen left off, quite out of court! Suppress him! Pinch him! Off with.`,
        isRead: true,
        isStared: true,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'roosevelt08@yahoo.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Catching up about work',
        body: `As she said to the Mock Turtle said with some severity; 'it's very rude.' The Hatter was the first really clever thing the King say in a pleased tone. 'Pray don't trouble yourself to say than his first speech. 'You should learn not to make it stop. 'Well, I'd hardly finished the first sentence in her hands, and she soon made out that part.' 'Well, at any rate: go and take it.`,
        isRead: true,
        isStared: false,
        isChecked: true,
        folder: 'sent',
        sentAt: Date.now(),
        composer: 'yossi@appsus.com',
        receiver: 'bobo@walla.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Your subscription is about to end',
        body: 'Dear User,\nYour subscription is about to end, you might want to renew it.\nPango',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'pango@pangoApp.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hey old friend',
        body: 'Hey lavada, its been a long time since we last met, how about catching up?',
        isRead: true,
        isStared: true,
        isChecked: false,
        folder: 'sent',
        sentAt: Date.now(),
        composer: 'yossi@appsus.com',
        receiver: 'lavada25@yahoo.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello Yossi',
        body: 'Lets build a better tomorrow, contact me for more details',
        isRead: true,
        isStared: true,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'dusty26@cole.org',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Do you need a loan?',
        body: 'Hey Yossi,\nDo you need a load?\nWe can get you one!',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'loanShark@hotmail.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Reminder to book tickets for our trip this summer',
        body: 'Hey yossi, dont forget to book tickets for out trip this summer',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'victoria52@vonrueden.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Security alert',
        body: 'Your account has been logged in from another computer, was it you?',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'facebook@facebook.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'I would like to meet you',
        body: `Then they all looked puzzled.) 'He must have prizes.' 'But who has won?' This question the Dodo said, 'EVERYBODY has won, and all her wonderful Adventures, till she heard something splashing about in the grass, merely remarking that a moment's delay would cost them their lives. All the time they were IN the well,' Alice said to the jury, who instantly made a rush at.`,
        isRead: true,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'cristian.wolf@gmail.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Dear yonatan',
        body: 'I need to think what to write here before sending dont I?',
        isRead: true,
        isStared: false,
        isChecked: false,
        folder: 'drafts',
        sentAt: Date.now(),
        composer: 'yossi@appsus.com',
        receiver: 'yonatan98@Gmail.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Join our service',
        body: `Doloribus rerum in in aperiam. Nemo libero fuga assumenda ad et laudantium et. Aut cumque porro vel voluptatibus aut aut. Autem aliquid voluptate incidunt qui quia tenetur corrupti. Excepturi quasi quaerat officiis reprehenderit qui similique. Quas aut illo atque explicabo impedit sapiente ad. Odio consequatur ad et inventore rerum et.`,
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'trash',
        sentAt: Date.now(),
        composer: 'someService@criminals.com',
        receiver: 'yossi@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Get free loans!',
        body: `Doloribus rerum in in aperiam. Nemo libero fuga assumenda ad et laudantium et. Aut cumque porro vel voluptatibus aut aut. Autem aliquid voluptate incidunt qui quia tenetur corrupti. Excepturi quasi quaerat officiis reprehenderit qui similique. Quas aut illo atque explicabo impedit sapiente ad. Odio consequatur ad et inventore rerum et.`,
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'trash',
        sentAt: Date.now(),
        composer: 'freeloans@criminals.com',
        receiver: 'yossi@appsus.com'
    },
];
_saveEmailsToStorage();

const loggedInUser = { email: 'yossi@appsus.com', fullname: 'Yossi cohen ' }


function query(filterBy) {
    if (filterBy) {
        const { searchTxt, isRead, isStared, folder } = filterBy;
        let starFilter = false;

        if( folder === 'starred' ){
            starFilter = true;
        }

        let filteredEmails = gEmails.filter(email => {
            return (
                (
                    email.subject.toLowerCase().includes(searchTxt) ||
                    email.body.toLowerCase().includes(searchTxt) ||
                    email.composer.toLowerCase().includes(searchTxt) ||
                    email.receiver.toLowerCase().includes(searchTxt)

                )  && ( email.folder === folder || starFilter)
            )
        });

        if( folder === 'starred' ){
            filteredEmails = filteredEmails.filter( email => email.isStared );
        }

        return Promise.resolve(filteredEmails);
    } else {
        return Promise.resolve(gEmails.filter(email => email.folder === 'inbox'));
    }
}

// && ( folder === 'starred' && isStared && email.isStared)

// Crud
function moveFolder(emailId, folder){
    const emailIdx = _getEmailIdxById(emailId);
    if(gEmails[emailIdx].folder === 'trash' && folder === 'trash'){
        gEmails.splice(emailIdx, 1);
        console.log('delete email')
    } else{
        gEmails[emailIdx].folder = folder;
    }
    _saveEmailsToStorage();
}

function deleteEmail(emailId){
    const emailIdx = _getEmailIdxById(emailId);
    gEmails.splice(emailIdx,1);
    _saveEmailsToStorage();
}

function createEmail(subject, body, folder = 'inbox', composer, receiver = loggedInUser.email) {
    const email = {
        id: utilService.makeId(4),
        subject,
        body,
        isRead: false,
        isStared: false,
        folder,
        sentAt: Date.now(),
        composer,
        receiver: receiver
    }

    gEmails.push(email);
    _saveEmailsToStorage();
}

function getLoggedUser() {
    return loggedInUser;
}

function isUserTheComposer(composer) {
    return composer === loggedInUser.email;
}

function toggleCheckEmailById(emailId) {
    const email = gEmails.find(email => email.id === emailId);

    if (email) {
        email.isChecked = !email.isChecked;
        _saveEmailsToStorage();
    }
}

function toggleCheckAllEmails(filterBy, isChecked) {
    query(filterBy).then(emailsToToggle => {
        emailsToToggle.forEach(email => { email.isChecked = isChecked });
        _saveEmailsToStorage();
    });
}

function cleanAllCheckedEmails() {
    gEmails.forEach(email => (email.isChecked = false))
    _saveEmailsToStorage();
}

function toggleEmailRead(emailId){
    const emailIdx = _getEmailIdxById(emailId);
    gEmails[emailIdx].isRead = !gEmails[emailIdx].isRead;
    _saveEmailsToStorage(); 
}

function toggleEmailStar(emailId){
    const emailIdx = _getEmailIdxById(emailId);
    gEmails[emailIdx].isStared = !gEmails[emailIdx].isStared;
    _saveEmailsToStorage(); 
}

function draftToMail(emailId, email){
    const emailIdx = _getEmailIdxById(emailId);
    gEmails[emailIdx] = email;
    gEmails[emailIdx].folder = 'sent';
    gEmails[emailIdx].sentAt = Date.now();
    _saveEmailsToStorage();
}

function saveDraft(emailId, draft) {
    const emailIdx = _getEmailIdxById(emailId);
    draft.sentAt = Date.now();
    gEmails[emailIdx] = draft;
    _saveEmailsToStorage();
}

function getUnReadEmailsCount(){
    let sum = 0;
    gEmails.forEach(email => {
        if(!email.isRead) sum++;
    });

    return sum;
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(EMAIL_KEY, gEmails)
}

function _getEmailIdxById(emailId){
    return gEmails.findIndex(email => email.id === emailId)
}