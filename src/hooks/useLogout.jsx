import axios from '../api/api';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    console.log('Auth from useLogout: ', auth);
    const name = auth.user;
    console.log('Auth from useLogout -> Name: ', name);
    setAuth({});
    try {
      const response = await axios.post(
        '/logout',
        { name },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
