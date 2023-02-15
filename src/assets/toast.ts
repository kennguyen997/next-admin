import { toast } from 'react-toastify';

//link: https://github.com/fkhadra/react-toastify
const toastOptions: any = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  // pauseOnFocusLoss,
  // draggable,
  // pauseOnHover,
};

const notify = (m: string) => {
  return toast(m, toastOptions);
};
const error = (m?: string) => {
  return toast.error(m || '실패한', toastOptions);
};
const success = (m?: string) => {
  return toast.success(m || '성공', toastOptions);
};
const info = (m: string) => {
  return toast.info(m, toastOptions);
};
const warn = (m: string) => {
  return toast.warn(m, toastOptions);
};
const clear = () => {
  return toast.dismiss();
};

const Toastconfig = { notify, error, success, info, warn, clear };

export default Toastconfig;
