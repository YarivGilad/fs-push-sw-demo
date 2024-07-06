import express from "express";
import morgan from "morgan";
import cors from "cors";
import log from "@ajar/marker";
import webpush, { PushSubscription } from "web-push";


const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

/* The first option is typically a mailto: URL 
   where subscribers can contact the administrator of the server */
webpush.setVapidDetails(
  "mailto:yariv.gilad@gmail.com", 
  vapidKeys.publicKey, 
  vapidKeys.privateKey
)

// For this demo subscriptions are stored in memory 
// You'd typically persist those in some db
let subscriptions: PushSubscription[] = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body as PushSubscription;
  subscriptions.push(subscription);
  //log.obj(subscriptions,'subscriptions');
  log.info('# subscriptions:',subscriptions.length);
  res.status(201).json({ status: "Subscribed Successfully!!" });
});

app.post("/unsubscribe", (req, res) => {
  const subscription = req.body as PushSubscription;
  subscriptions = subscriptions.filter( sub => sub.keys.auth !== subscription.keys.auth );
  // log.obj(subscriptions,'subscriptions');
  log.yellow('# subscriptions:',subscriptions.length);
  res.status(201).json({status: "UnSubscribed Successfully!!"});
});

app.post("/send-notification", async (req, res) => {
  try{
    const notificationPayload = {
        title: "Something new had arrived",
        body: "I'm a new Notification from Admin server",
        icon: "https://www.yarivgilad.com/images/yariv.png",
        data: {
          url: "https://www.yarivgilad.com/",
        },
    };
    // log.obj(subscriptions,'subscriptions');
    // log.yellow('subscription endpoint:',subscriptions[0]?.endpoint);
    await Promise.all(
      subscriptions.map((subscription) =>
        webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
      )
    )
    res.status(200).json({ message: "Notification sent successfully." });

  }catch(err:unknown){
    console.error(err);
    res.status(500).json({ Error: (err as Error).message, stack: (err as Error).stack });
  }
});

app.listen(3000, () => {
  log.magenta(`🌎  listening on`,` ✨ ⚡ http://localhost:${process.env.PORT}`,`🚀`);
});