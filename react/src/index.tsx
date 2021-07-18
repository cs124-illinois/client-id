import publicIP from "public-ip"
import React, { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export interface ClientIDProviderProps {
  IPinterval?: number
}
export interface ClientIDContext {
  browserID?: string
  tabID?: string
  IPv4?: string
  IPv6?: string
}
export const ClientIDContext = createContext<ClientIDContext>({
  browserID: "",
  tabID: "",
})

export const ClientIDProvider: React.FC<ClientIDProviderProps> = ({ IPinterval = 5 * 6 * 1000, children }) => {
  const [browserID, setBrowserID] = useState<string | undefined>()
  useEffect(() => {
    const id = localStorage.getItem("client-id") || uuidv4()
    localStorage.setItem("client-id", id)
    setBrowserID(id)
  }, [])
  const [tabID, setTabID] = useState<string | undefined>()
  useEffect(() => {
    const id = sessionStorage.getItem("client-id") || uuidv4()
    sessionStorage.setItem("client-id", id)
    setTabID(id)
  }, [])
  const [IPv4, setIPv4] = useState<string | undefined>(undefined)
  const [IPv6, setIPv6] = useState<string | undefined>(undefined)

  useEffect(() => {
    const checkIP = () => {
      publicIP
        .v4()
        .then((_ip) => {
          setIPv4(_ip)
        })
        .catch(() => {
          setIPv4(undefined)
        })
      publicIP
        .v6()
        .then((_ip) => {
          setIPv6(_ip)
        })
        .catch(() => {
          setIPv6(undefined)
        })
    }
    const timer = setInterval(() => checkIP, IPinterval)
    checkIP()
    return () => {
      clearInterval(timer)
    }
  }, [IPinterval, setIPv4, setIPv6])

  return <ClientIDContext.Provider value={{ browserID, tabID, IPv4, IPv6 }}>{children}</ClientIDContext.Provider>
}

export const useClientID = (): ClientIDContext => useContext(ClientIDContext)
