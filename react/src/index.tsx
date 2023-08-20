import publicIP from "public-ip"
import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export interface ClientIDProviderProps {
  IPinterval?: number
  disableIP?: boolean
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

export const ClientIDProvider: React.FC<PropsWithChildren<ClientIDProviderProps>> = ({
  IPinterval = 5 * 6 * 1000,
  disableIP,
  children,
}) => {
  const browser = useRef<string>((typeof window !== "undefined" && localStorage.getItem("client-id")) || uuidv4())
  const tab = useRef<string>((typeof window !== "undefined" && sessionStorage.getItem("client-id")) || uuidv4())

  useEffect(() => {
    localStorage.setItem("client-id", browser.current)
    sessionStorage.setItem("client-id", tab.current)
  }, [])

  const [ip, setIP] = useState<{ v4?: string; v6?: string }>({})

  useEffect(() => {
    if (disableIP) {
      return
    }
    const checkIP = async () => {
      let v4
      try {
        v4 = await publicIP.v4()
      } catch (err) {
        //
      }
      let v6
      try {
        v6 = await publicIP.v6()
      } catch (err) {
        //
      }
      setIP({ v4, v6 })
    }
    const timer = setInterval(() => checkIP, IPinterval)
    checkIP()
    return () => {
      clearInterval(timer)
    }
  }, [IPinterval, disableIP])

  return (
    <ClientIDContext.Provider value={{ browserID: browser.current, tabID: tab.current, IPv4: ip.v4, IPv6: ip.v6 }}>
      {children}
    </ClientIDContext.Provider>
  )
}

export const useClientID = (): ClientIDContext => useContext(ClientIDContext)
