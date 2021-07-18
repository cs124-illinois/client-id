import { ClientIDProvider, useClientID } from "@cs124/client-id"

const ClientIDDemo: React.FC = () => {
  const { browserID, tabID, IPv4, IPv6 } = useClientID()
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
