import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../../context/playerContext/PlayerContext';

const hour = 60 * 60 * 1000;

export default function GameBtn({ text, action, callback }) {
  const navigate = useNavigate();
  const {
    setTestingMode,
    setForceRerender,
    dispatch,
    setCatchUp,
    setFakeDate,
  } = usePlayerContext();

  const handleAction = (actionName, cb) => {
    if (actionName === 'Inventory') {
      // setIsInventoryOpen(true);
      cb(true);
      // console.log('Modal should Open!', callback);
    } else {
      console.log(actionName);
    }

    if (actionName === 'Maps') {
      navigate('/battleground');
    } else {
      console.log(actionName);
    }

    if (actionName === 'Marketplace') {
      navigate('/marketplace');
    } else {
      console.log(actionName);
    }

    if (actionName === 'Craft') {
      cb(true);
    } else {
      console.log(actionName);
    }

    if (actionName === 'Leaderboard') {
      // cb(true);
      navigate('/leaderboard');
    } else {
      console.log(actionName);
    }
  };

  return (
    <AwesomeButton
      type="primary"
      onPress={() => handleAction(action, callback)}
    >
      {text}
    </AwesomeButton>
  );
}
