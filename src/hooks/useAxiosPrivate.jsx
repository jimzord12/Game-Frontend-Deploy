import { useEffect } from 'react';
import { axiosPrivate } from '../../api/api';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

// What us happeing here:
// 1) We get the public Axios Instance
// 2) We insert interceptors (like middleware) that will check if an error is thrown
// 3) When an error is thrown, they will try to refresh the AccessToken automatically

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  console.log('useAxiosPrivate:: Auth: ', auth.accessToken);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          console.log(
            'useAxiosPrivate::Request::Interceptor => Auth: ',
            auth.accessToken
          );
          console.log(
            'The request was Intercepted | Cause: Not Auth Headers | Adding A-JWT to Auth Headers -> ',
            auth?.accessToken.slice(
              auth?.accessToken.length - 12,
              auth?.accessToken.length
            )
          );
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // console.log(
        //     'useAxiosPrivate Hook -> prevRequest: ',
        //     prevRequest
        // );
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // console.log('useAxiosPrivate Hook -> Error: ', error);
          prevRequest.sent = true;
          console.log(
            'The Access Token Expired! Checking if Refresh Token is still valid... '
          );
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
