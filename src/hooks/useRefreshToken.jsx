// import { axiosPrivate } from '../api/api';
import axios from '../../api/api';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    // console.log('From useRefreshToken Hook: Auth ', auth);
    try {
      const response = await axios.post(
        '/refresh',
        { name: auth.user },
        {
          withCredentials: true,
        }
      );
      console.log('Refresh Token -> Still Valid! 😁');

      setAuth((prev) => {
        console.log(
          'Previous A-JWT -> ',
          prev.accessToken.slice(
            prev.accessToken.length - 12,
            prev.accessToken.length
          )
        );
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      });
      console.log(
        'New A-JWT -> ',
        response.data.accessToken.slice(
          response.data.accessToken.length - 12,
          response.data.accessToken.length
        )
      );
      return response.data.accessToken;
    } catch (error) {
      if (error.response.data.message.endsWith('R-JWT probably expired 😱')) {
        console.log('-> 😱 The Refresh Token has Expired! 😱 <-');
        console.log('-> You must login again, to create a new one 😋 <-');
        navigate('/login');
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
