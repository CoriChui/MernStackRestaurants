import { useContext, createContext, useCallback, useEffect, useState } from 'react';
import React from 'react';

const tokenStorageName = 'authToken'
const idStorageName = 'authId'
const nameStorageName = 'authName'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AppProvider = ({ children }) => {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)

  const login = useCallback((data) => {
    const token = data.token
    const userId = data.userId
    const userName = data.name
    if (!token || !userId || !userName) {
      return
    }
    setToken(token)
    setUserId(userId)
    setUserName(userName)
    localStorage.setItem(tokenStorageName, token)
    localStorage.setItem(idStorageName, userId)
    localStorage.setItem(nameStorageName, userName)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserName(null)
    localStorage.removeItem(tokenStorageName)
    localStorage.removeItem(idStorageName)
    localStorage.removeItem(nameStorageName)
  }, [])

  console.log("authProvider rendered")

  useEffect(() => {
    let token = localStorage.getItem(tokenStorageName)
    let userId = localStorage.getItem(idStorageName)
    let userName = localStorage.getItem(nameStorageName)
    setToken(token)
    setUserId(userId)
    setUserName(userName)
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, userName }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AppProvider