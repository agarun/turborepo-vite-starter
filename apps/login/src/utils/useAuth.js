import { useState, useCallback, useEffect, useRef } from 'react';

const authApi = () => {};

const getAccessToken = () => window.localStorage.getItem('accessToken');

const decodeToken = () => {};

export function useAuth() {
  const [accessToken, setAccessToken] = useState(getAccessToken);
  const [decodedToken, setDecodedToken] = useState(() =>
    accessToken ? decodeToken(accessToken) : null
  );

  const [refreshError, setRefreshError] = useState();
  const intervalIdRef = useRef();

  const refreshAccessToken = useCallback(async () => {
    const response = await authApi.refreshAccessToken();

    if (response.ok) {
      const token = (await response.json()).accessToken;
      setAccessToken(token);
      setRefreshError(null);
    } else if (response.status >= 500) {
      setRefreshError(true);
    } else {
      setAccessToken(null);
      setRefreshError(null);
    }
  }, []);

  useEffect(() => {
    if (refreshError) {
      intervalIdRef.current = setInterval(refreshAccessToken, 60 * 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [refreshError, refreshAccessToken]);

  useEffect(() => {
    if (accessToken !== window.localStorage.getItem('accessToken')) {
      if (accessToken) {
        window.localStorage.setItem('accessToken', accessToken);
        setDecodedToken(decodeToken(accessToken));
      } else {
        window.localStorage.removeItem('accessToken');
        setDecodedToken(null);
      }
    }
  }, [accessToken]);

  /**
   * Refresh the access token before it expires to keep access.
   */
  useEffect(() => {
    let timeoutId;

    function scheduleRefreshAccessToken() {
      const currentTime = Date.now();
      const expirationTime = new Date(decodedToken.exp * 1000);
      const buffer = 60 * 1000;
      const timeLeftUntilExpiration =
        expirationTime - currentTime > buffer
          ? expirationTime - currentTime - buffer
          : 1;

      timeoutId = setTimeout(refreshAccessToken, timeLeftUntilExpiration);
    }

    if (decodedToken) {
      scheduleRefreshAccessToken();
    }

    return () => clearTimeout(timeoutId);
  }, [decodedToken, refreshAccessToken]);

  /**
   * Verify the access token is valid.
   * @returns {(object|null)} Decoded token if valid, or null if invalid.
   */
  const validateToken = useCallback(async () => {
    const response = await authApi.getCurrentUser();
    if (response.ok) {
      // Valid access token
      const currentUser = (await response.json()).current_user;
      setDecodedToken(currentUser);

      return currentUser;
    } else {
      // Malformed or expired access token
      refreshAccessToken();

      return null;
    }
  }, [refreshAccessToken]);

  const loginUser = async data => {};

  const logoutUser = async () => {
    setAccessToken(null);
    authApi.revokeRefreshToken();
  };

  return {
    hasAccessToken: Boolean(accessToken),
    accessToken,
    currentUser: decodedToken?.data,
    isLoggedIn: Boolean(decodedToken),
    loginUser,
    logoutUser,
    validateToken,
    refreshAccessToken
  };
}
