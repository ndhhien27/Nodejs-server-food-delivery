import request from './request';
import axios from 'axios';
import { CUST_FCM_KEY, MERC_FCM_KEY } from './contants';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const sendNotification = (content, receiver, fcmToken, resCb, errCb) => {
  const { title, orderId, createdAt, hasRead, _id, restaurant } = content;
  const headers = {
    Authorization: receiver.to === 'rest' ? MERC_FCM_KEY : CUST_FCM_KEY,
  }
  console.log(orderId);
  const data = {
    to: fcmToken,
    notification: {
      "body": `OrderId-${orderId}`,
      title,
      "content_available": true,
      "priority": "high"
    },
    data: {
      title,
      orderId,
      hasRead,
      _id,
      createdAt,
      restaurant,
      "content_available": true,
      "priority": "high"
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