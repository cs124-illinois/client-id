import crypto from "crypto"
import { publicIpv4, publicIpv6 } from "public-ip"

import base64url from "base64url"
import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react"

const generateRandomID = (): string => base64url.fromBase64(crypto.randomBytes(20).toString("base64"))

export interface ClientIDProviderProps {
  IPinterval?: number
  disableIP?: boolean
  cookies?: boolean
  domain?: string
  verbose?: boolean
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

const BROWSER_ID = "browserID"
const TAB_ID = "tabID"

export const ClientIDProvider: React.FC<PropsWithChildren<ClientIDProviderProps>> = ({
  IPinterval = 5 * 6 * 1000,
  disableIP,
  verbose,
  cookies,
  domain,
  children,
}) => {
  const browserID = useRef<string>(
    (typeof window !== "undefined" && localStorage.getItem(BROWSER_ID)) || generateRandomID(),
  )
  const tabID = useRef<string>((typeof window !== "undefined" && sessionStorage.getItem(TAB_ID)) || generateRandomID())

  useEffect(() => {
    verbose && console.log(`Browser: ${browserID.current}, Tab: ${tabID.current}`)
    localStorage.setItem(BROWSER_ID, browserID.current)
    sessionStorage.setItem(TAB_ID, tabID.current)
  }, [verbose])

  useEffect(() => {
    if (!cookies) {
      document.cookie = `${BROWSER_ID}=${browserID.current}; max-age=0;`
      document.cookie = `${TAB_ID}=${tabID.current}; max-age=0;`
      return
    }
    if (domain) {
      document.cookie = `${BROWSER_ID}=${browserID.current}; max-age=31536000; path=/; samesite=lax; domain=${domain};`
      document.cookie = `${TAB_ID}=${tabID.current}; max-age=31536000; path=/; samesite=lax; domain=${domain};`
    } else {
      document.cookie = `${BROWSER_ID}=${browserID.current}; max-age=31536000; path=/; samesite=lax;`
      document.cookie = `${TAB_ID}=${tabID.current}; max-age=31536000; path=/; samesite=lax;`
    }
  }, [cookies, domain])

  const [ip, setIP] = useState<{ v4?: string; v6?: string }>({})

  useEffect(() => {
    if (disableIP) {
      return
    }
    const checkIP = async () => {
      let v4
      try {
        v4 = await publicIpv4()
        verbose && console.log(`IPv4: ${v4}`)
      } catch (err) {
        //
      }
      let v6
      try {
        v6 = await publicIpv6()
        verbose && console.log(`IPv6: ${v4}`)
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
  }, [IPinterval, disableIP, verbose])

  return (
    <ClientIDContext.Provider value={{ browserID: browserID.current, tabID: tabID.current, IPv4: ip.v4, IPv6: ip.v6 }}>
      {children}
    </ClientIDContext.Provider>
  )
}

export const useClientID = (): ClientIDContext => useContext(ClientIDContext)
