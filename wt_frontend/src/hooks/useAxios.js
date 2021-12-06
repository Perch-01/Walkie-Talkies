import React, { useState, useEffect } from 'react';

import axios from '../utils/axiosClient'
import debounce from 'lodash/debounce'
import qs from 'qs'
import useToken from './useToken'

const useAxios = (stdUrl) => {

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [promise, setPromise] = useState()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const { token } = useToken();

  const accessTokenJWT = token ? token : null;
  
  useEffect(() => {
    if (!promise) return

    (async () => {
      try {
        const result = await promise
        setLoading(false)
        if (result.status - 400 < 0) {
          setData(result.data)
          setResult({
            status: 'success',
            isSuccess: true,
            action: result && result.config && result.config.method,
            data: result && result.data
          })
        }
      } catch (e) {
        console.log({ e })
        setLoading(false)
        setResult({
          status: 'error',
          isSuccess: false,
          action: result && result.config && result.config.method,
          message: { ...e },
          error: { ...e.response }
        })
        setError({ ...e.response })
        return
      }
    })()
  }, [promise])

  const getData = debounce(
    async ({ params = {}, headers }) => {
      if (loading) return

      try {
        setLoading(true)
        const promise = axios.get(stdUrl, {
          params,
          paramsSerializer: (params) => {
            return qs.stringify(params, {
              // arrayFormat: 'repeat'
              arrayFormat: 'comma'
            })
          },
          headers: {
            ...headers,
            ...(accessTokenJWT ? { "Authorization": "Bearer " + accessTokenJWT } : {})
          }
        })
        setPromise(promise)
        return promise
      } catch (error) {
        return
      }
    },
    500,
    { leading: false, trailing: true }
  )

  // Post Data
  const postData = debounce(
    async ({
      params = {},
      urlEncoded = false,
      headers = {}
    }) => {
      if (loading) return
      try {
        setLoading(true)
        setResult(null)
        const promise = axios.post(
          stdUrl,
          urlEncoded ? encodeUrl(params) : params,
          {
            headers: {
              ...headers,
              ...(accessTokenJWT ? { "Authorization": "Bearer " + accessTokenJWT } : {}),
              'Content-Type':
                params instanceof FormData ?
                  'multipart/form-data' :
                  urlEncoded ?
                    'application/x-www-form-urlencoded' :
                    'application/json'
            }
          }
        )
        setPromise(promise)
        return promise
      } catch (error) {
        return
      }
    },
    200,
    { leading: true, trailing: true }
  )

  // Put Data
  const putData = debounce(
    async ({ params = {}, urlEncoded = false }) => {
      if (loading) return

      try {
        setLoading(true)
        setResult(null)

        const promise = axios.put(stdUrl, urlEncoded ? encodeUrl(params) : params, {
          headers: {
            ...(accessTokenJWT ? { "Authorization": "Bearer " + accessTokenJWT } : {}),
            'Content-Type':
              params instanceof FormData ?
                'multipart/form-data' :
                urlEncoded ?
                  'application/x-www-form-urlencoded' :
                  'application/json'
          }
        })

        setPromise(promise)
        return promise
      } catch (error) { }
    },
    200,
    { leading: true, trailing: true }
  )

  // Patch Data
  const patchData = debounce(
    async ({
      params = {},
      urlEncoded = false
    }) => {
      if (loading) return
      try {
        setLoading(true)
        setResult(null)
        const promise = axios.patch(
          stdUrl,
          urlEncoded ? encodeUrl(params) : params,
          {
            headers: {
              ...(accessTokenJWT ? { "Authorization": "Bearer " + accessTokenJWT } : {}),
              'Content-Type':
                params instanceof FormData ?
                  'multipart/form-data' :
                  urlEncoded ?
                    'application/x-www-form-urlencoded' :
                    'application/json'
            }
          }
        )
        setPromise(promise)
        return promise
      } catch (error) { }
    },
    200,
    { leading: true, trailing: true }
  )

  // Delete Data
  const deleteData = debounce(
    async document => {
      if (loading) return

      try {
        setLoading(true)
        setResult(null)

        const promise = axios.delete(stdUrl, document)
        setPromise(promise)
        return promise
      } catch (error) { }
    },
    200,
    { leading: true, trailing: true }
  )

  const reset = () => {
    setData(null)
  }

  return {
    result,
    loading,
    data,
    deleteData,
    getData,
    postData,
    putData,
    patchData,
    reset,
    error,
    resetError: () => setError(null)
  }
}

const encodeUrl = (obj) => {
  return encodeURI(Object.entries(obj).map(([key, val]) => {
    const customVal = typeof val === 'object' ? JSON.stringify(val) : val
    return '' + key + '=' + customVal
  }).join('&'))
}
/*
const selectUserToken = createSelector(
  state => state.user,
  user => user.access_token
)
*/
export default useAxios
