import request from './request';
import axios from 'axios';
import { CUST_FCM_KEY, MERC_FCM_KEY } from './contants';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const sendNotification = (content, receiver, fcmToken, restaurant, resCb, errCb) => {
  const { title, orderId, createdAt, hasRead, _id } = content;
  const headers = {
    Authorization: receiver === 'rest' ? MERC_FCM_KEY : CUST_FCM_KEY,
  }
  const data = {
    to: fcmToken,
    "priority": "high",
    notification: {
      "body": `OrderId-${orderId}`,
      title,
      "content_available": true,
      show_in_foreground: true,
    },
    data: {
      title,
      orderId,
      hasRead,
      _id,
      createdAt,
      restaurant,
      "content_available": true,
    }
  }
  return axios({
    url: 'https://fcm.googleapis.com/fcm/send',
    data,
    method: 'post',
    headers,
  }).then(resCb).catch(errCb)
}

export default {
  sendNotification
};