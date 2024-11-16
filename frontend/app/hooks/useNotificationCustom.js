'use client'
import { notification } from 'antd';
export default function useNotificationCustom(){
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: null,
    });
  };
  return{
    contextHolder,
    openNotificationWithIcon,
  }
}


