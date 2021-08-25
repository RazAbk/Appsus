import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const emailService = {
    createEmail,
    getLoggedUser,
    query,
    getEmailById,
    isUserTheComposer,
    toggleCheckEmailById,
    cleanAllCheckedEmails,
    toggleCheckAllEmails
}

const EMAIL_KEY = 'emailsDB'
const gEmails = storageService.loadFromStorage(EMAIL_KEY) || [{
        id: utilService.makeId(4),
        subject: 'Hello there',
        body: 'I would like to know you better',
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
        subject: 'Hello body',
        body: 'I would like to know you',
        isRead: false,
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
        isRead: false,
        isStared: false,
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
];
_saveEmailsToStorage();

const loggedInUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }


function query(filterBy) {
    if (filterBy) {
        let { searchTxt, isRead, isStared, folder } = filterBy;

        const filteredEmails = gEmails.filter(email => {
            return (
                (
                    email.subject.toLowerCase().includes(searchTxt) ||
                    email.body.toLowerCase().includes(searchTxt) ||
                    email.composer.toLowerCase().includes(searchTxt) ||
                    email.receiver.toLowerCase().includes(searchTxt)

                ) && email.isRead === isRead && email.isStared === isStared &&
                email.folder === folder
            )
        })
        return Promise.resolve(filteredEmails);
    } else {
        return Promise.resolve(gEmails.filter(email => email.folder === 'inbox'));
    }
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

function getEmailById(id) {


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
    console.log('filterBy: ', filterBy)
    query(filterBy).then(emailsToToggle => {
        emailsToToggle.forEach(email => { email.isChecked = isChecked });
        _saveEmailsToStorage();
    });
}

function cleanAllCheckedEmails() {
    gEmails.forEach(email => (email.isChecked = false))
    _saveEmailsToStorage();
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(EMAIL_KEY, gEmails)
}