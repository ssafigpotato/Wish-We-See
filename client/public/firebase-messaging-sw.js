// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase 앱 초기화
firebase.initializeApp({
  apiKey: "AIzaSyBbhjkoB6zMvvZeNziBNpUt_f8vuPclxPM",
  authDomain: "missing-f99bf.firebaseapp.com",
  projectId: "missing-f99bf",
  storageBucket: "missing-f99bf.appspot.com",
  messagingSenderId: "816803031689",
  appId: "1:816803031689:web:59c7e6446a5638587e3458",
  measurementId: "G-22SLLTV3PR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const serviceName = '위시';
  const notificationTitle = `${serviceName} - ${payload.notification.title}`;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.svg', // public 폴더의 logo.svg 사용
    badge: '/logo.svg', // 뱃지 아이콘 설정
    tag: payload.notification.title, // 중복 알림 방지용 태그 설정
    data: {
      click_action: payload.data?.click_action || '/' // 알림에 URL 데이터를 포함
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // 알림 닫기

  const targetUrl = event.notification.data?.click_action || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(new URL(targetUrl, self.location.origin).pathname) && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
