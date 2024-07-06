import toast from "react-hot-toast";
import { subscribe, unsubscribe } from "../network/api.js";
import { colors } from "../utils/color-logger.js";

const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export async function registerSW() {
  try {
    if ("serviceWorker" in navigator) {
      const options: RegistrationOptions = {
        scope: "/",
        type: "module",
      };
      const registration: ServiceWorkerRegistration = await navigator.serviceWorker.register("/sw.js", options);
      const SW = registration.installing || registration.waiting || registration.active;

      SW?.addEventListener("statechange", async (e) => {
        if (e.target && "state" in e.target) {
          colors.log(`⚡️ SW state change:`, colors.orange, e.target.state as string);

          if (e.target.state === "activated") {
            const subscription: PushSubscription =
              await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey,
              });

            // console.log(subscription);
            colors.log(`Subscribing to notifications...`, colors.cyan, `⏳⏳⏳`);
            const data = await subscribe(subscription);
            toast.success(data.status);
            // console.log(data);
          }
        }
      });

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        colors.log("⚡️ Notification permission granted ⚡️", colors.green);
        toast.success("⚡️ Notification permission granted ⚡️");
      } else {
        colors.log("⚡️ Notification permission denied ⚡️", colors.red);
        console.error("Notification permission denied.");
        toast.error("⚡️ Notification permission denied ⚡️");
      }

      navigator.serviceWorker.addEventListener('message', function(event) {
        const {data, title, body} = event.data;
        colors.log('⚡️ Message received from SW ⚡️', colors.yellow , data);
    
        // Display the notification using the Notification API
        // const n = new Notification(data.title, {
        //   body: data.body,
        // });

        // setTimeout(()=> n.close(),2000);
        toast(()=> (
          <div>
            <img src="./yariv.png" width="60" height="60" alt="icon" style={{borderRadius:"50%", marginTop:"1rem"}}/>
            <h3>{title}</h3>
            <p>{body}</p>  
          </div>
        ))
      });
    }
  } catch (err: unknown) {
    toast.error((err as Error).message);
  }
}

export async function unregisterSW() {
  const registration = await navigator.serviceWorker.getRegistration("/");
  const subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    colors.log(`Un-subscribing to notifications...`, colors.magenta, `⏳⏳⏳`);
    const data = await unsubscribe(subscription);
    toast.success(data.status);
    // console.log(data);
  }
  await registration?.unregister();

  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

export function checkControlled() {
  if (navigator.serviceWorker.controller) {
    toast.success("A Service Worker is controlling this Page!");
  } else {
    toast("No service worker here...", { icon: "🔎" });
  }
}
