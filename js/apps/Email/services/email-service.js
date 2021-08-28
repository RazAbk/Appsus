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
        subject: 'Hello there',
        body: 'I would like to know you better',
        isRead: false,
        isStared: true,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello body',
        body: 'I would like to know you',
        isRead: true,
        isStared: false,
        isChecked: false,
        folder: 'sent',
        sentAt: Date.now(),
        composer: 'user@appsus.com',
        receiver: 'bobo@walla.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello friend',
        body: 'I would like to meet',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'dori@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mahatma',
        body: 'I would like to have fun',
        isRead: true,
        isStared: true,
        isChecked: false,
        folder: 'sent',
        sentAt: Date.now(),
        composer: 'user@appsus.com',
        receiver: 'nahum@microsoft.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mister',
        body: 'Lets build a better tomorrow',
        isRead: true,
        isStared: true,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mr',
        body: 'I like you',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mr',
        body: 'I like you',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mr',
        body: 'I like you',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Hello mr',
        body: 'I like you',
        isRead: true,
        isStared: false,
        isChecked: false,
        folder: 'inbox',
        sentAt: Date.now(),
        composer: 'yossi@Gmail.com',
        receiver: 'user@appsus.com'
    },
    {
        id: utilService.makeId(4),
        subject: 'Dear yonatan',
        body: 'I need to think what to write here before sending dont I?',
        isRead: false,
        isStared: false,
        isChecked: false,
        folder: 'drafts',
        sentAt: Date.now(),
        composer: 'user@appsus.com',
        receiver: 'yonatan@Gmail.com'
    },
];
_saveEmailsToStorage();

const loggedInUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }


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