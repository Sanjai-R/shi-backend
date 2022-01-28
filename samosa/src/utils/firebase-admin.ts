import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('./credentials.json')),
});

export const sendNotification = (
  tokens: string[],
  link: string,
  message: string,
) => {
  admin.messaging().sendMulticast({
    tokens: tokens,
    notification: {
      title: 'New Job Recommended for you',
    },
    webpush: {
      headers: {
        Urgency: 'high',
      },
      notification: {
        body: message,
        requireInteraction: true,
        data: {
          link: link,
        },
      },
    },
  });
};
