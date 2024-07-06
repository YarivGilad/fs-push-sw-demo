const baseUrl = import.meta.env.VITE_SERVER_URL;

interface SubscriptionResponse{
    status: string
}
export async function subscribe(subscription: PushSubscription){

    const res = await fetch(`${baseUrl}/subscribe`, {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        }, 
      });

      const data = await res.json() as SubscriptionResponse;
      //console.log(data);
      return data;
}

export async function unsubscribe(subscription: PushSubscription){

    const res = await fetch(`${baseUrl}/unsubscribe`, {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        }, 
      });

      const data = await res.json() as SubscriptionResponse;
      //console.log(data);
      return data;
}