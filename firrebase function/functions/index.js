const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.sendNotification = functions.database.ref('/messages/{Message_Key}')
    .onWrite((event) => {
        const payload = {
            notification: {
                title: 'New Message from',
                body: event.after._data.message,
                status: 'Wohoo its work',
                // click_action: 'https://testing-project-development.firebaseapp.com'
            }
        }

        console.info(payload)
        const receiverID = event.after._data.reciverId;

        return admin.database().ref('/users/' + receiverID + '/')
            .once('value').then((data) => {

                // if (!data.val()) return;

                const snapshot = data.val();
                const token = snapshot.token;

                return admin.messaging().sendToDevice(token, payload);
            });
    })

