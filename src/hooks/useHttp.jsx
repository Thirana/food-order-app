// function to handle HTTP requests
import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send the request",
    );
  }

  return resData;
}

//this hook does not always need to execute when the component re-render
//(in Checkout component, this will execute when only POST request is submitted
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // function to handle state based on HTTP state
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    // for the GET requests, this should execute, when the component renders first time
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // any component that uses this hook, can access following values
  return {
    data,
    isLoading,
    error,
    // for the other HTTP request types, we need to execute manually. therefore we need to expose this to the caller
    sendRequest,
  };
}
