import { store } from "react-notifications-component";

export default (message, type) => {
  store.addNotification({
    title: "Senrysa App",
    message: message,
    type: type || "info", //'success' | 'danger' | 'info' | 'default' | 'warning'
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};


export const presistNotify = (message, type, title) => {
  return store.addNotification({
    title: title || 'Senrysa App',
    message: message,
    type: type || "info", //'success' | 'danger' | 'info' | 'default' | 'warning'
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: Infinity,
      onScreen: true,
    },
  });
};
