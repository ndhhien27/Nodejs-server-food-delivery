import request from './request';
import axios from 'axios';
import { FCM_KEY } from './contants';
axios.defaults.headers.common['Authorization'] = FCM_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const sendNotification = (content, fcmToken, resCb, errCb) => {
  const { title, orderId, createdAt, hasRead, _id } = content;
  console.log(orderId);
  const data = {
    to: fcmToken,
    notification: {
      "body": orderId,
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
      "content_available": true,
      "priority": "high"
    }
  }
  return axios({
    url: 'https://fcm.googleapis.com/fcm/send',
    data,
    method: 'post'
  }).then(resCb).catch(errCb)
}

export default {
  sendNotification
};