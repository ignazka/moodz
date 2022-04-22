import React from 'react';

/*
  The use fetch hook recieves as a first argument a async function 
  This hook handles the diferent states of fetching data
  It will start with loading true, error false and data null
  When the call to the handler is done it will update the loading to false
  If there is data then it will update the data state or it will save the error
  The second argument are the dev dependencies to check
*/

export function useFetch(handler, dev = []) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function call() {
    try {
      const { data } = await handler();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    call();
  }, dev);

  return {
    data,
    loading,
    error,
  };
}
