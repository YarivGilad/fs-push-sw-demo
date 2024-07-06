
import {colors} from "./color-logger.js";

self.addEventListener("install", (event) => { 
  colors.log("⚡️ SW install event ⚡️", colors.yellow);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => { 
  colors.log("⚡️ SW activate event ⚡️", colors.green);
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", async (event) => {
    const data = event.data.json();
    colors.log("⚡️ SW push event ⚡️", colors.magenta, data);

    const { title, body, icon, data:{ url } } = data;
  
    const notificationOptions = {
      title,
      body,
      icon,
      tag: "notification-group-tag", // Use a unique tag to prevent duplicate notifications
      data: {
        url, // Replace with the desired URL for redirecting user to the desired page
      },
    };
  
    colors.log("⚡️ SW push event ⚡️ notificationOptions: ", colors.cyan, notificationOptions);
    
    // Post a message to the main script
    const clients = await self.clients.matchAll()
    clients.forEach(client => client.postMessage(notificationOptions));
    
    // event.waitUntil(
    //    self.registration.showNotification(title, notificationOptions);
    // );
    // self.registration.showNotification(title, {body,icon})

    // const message = {
    //   title,
    //   body
    // };
  
    // Post a message to the main script
    // const clients = await self.clients.matchAll()
    // clients.forEach(client => client.postMessage(message));


    /* const title = data.title || 'Default title';
    const options = {
      body: data.body || 'Default body',
      icon: 'images/icon.png', // Path to the icon image
      badge: 'images/badge.png', // Path to the badge image
      vibrate: [200, 100, 200], // Vibration pattern
      tag: 'new-message', // A tag to group notifications
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: 'images/open.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: 'images/dismiss.png'
        }
      ],
      data: {
        url: data.url // Additional data to pass along with the notification
      }
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    ); */
  
  });