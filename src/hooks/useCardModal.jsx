import { useState } from 'react';

// Centralizes modal control
const useCardModal = () => {
  const [isModalOpen_hook, setIsModalOpen_hook] = useState(false);

  const close = () => setIsModalOpen_hook(false);
  const open = () => setIsModalOpen_hook(true);

  console.log('CardModal Hook is Open: ', isModalOpen_hook);

  return { isModalOpen_hook, close, open };
};

export default useCardModal;
