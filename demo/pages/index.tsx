import { ClientIDProvider, useClientID } from "@cs124/client-id"
import { useEffect, useState } from "react"

const ClientIDDemo: React.FC = () => {
  const [display, setDisplay] = useState(false)
  useEffect(() => {
    setDisplay(true)
  }, [])
  const { browserID, tabID, IPv4, IPv6 } = useClientID()
  if (!display) {
    return null
  }
  return (
    <div>
      {browserID && <p>Browser ID: {browserID}</p>}
      {tabID && <p>Tab ID: {tabID}</p>}
      {IPv4 && <p>IPv4: {IPv4}</p>}
      {IPv6 && <p>IPv6: {IPv6}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <ClientIDProvider>
      <h1>Client ID Demo</h1>
      <ClientIDDemo />
    </ClientIDProvider>
  )
}
