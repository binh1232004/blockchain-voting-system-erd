'use client'
import { notification } from 'antd';
export default function useNotificationCustom(){
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description, duration) => {
    api[type]({
      message: message,
      description: description,
      duration: duration || null,
    });
  };
  return{
    contextHolder,
    openNotificationWithIcon,
  }
}


