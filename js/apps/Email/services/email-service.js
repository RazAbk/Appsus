import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const emailService = {
    createEmail,
    getLoggedUser,
    query
}

const EMAIL_KEY = 'emailsDB'
const gEmails = storageService.loadFromStorage(EMAIL_KEY) || [];

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

// _createEmails();

function query() {
    return Promise.resolve(gEmails);
}


function createEmail(subject, body, composer, receiver = loggedinUser.email) {
    const email = {
        id: utilService.makeId(4),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        composer,
        receiver: receiver
    }

    gEmails.push(email);
    _saveEmailsToStorage();
}

function _createEmails() {
    createEmail('wowwww', 'yesssss', 'Raz@Gmail.com');
    createEmail('yayyyy', 'helloooo', 'momo@Gmail.com');
    createEmail('amazing', 'to do list', 'shlomi@Gmail.com');
    createEmail('amazing', 'to do list', 'user@appsus.com', 'receiver@gmail.com');
    createEmail('amazing', 'to do list', 'user@appsus.com', 'receiver@gmail.com');
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(EMAIL_KEY, gEmails)
}

function getLoggedUser() {
    return loggedinUser;
}