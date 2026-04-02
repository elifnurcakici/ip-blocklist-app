import {useEffect, useState} from "react"

function App(){
  const[ip, setIp] = useState<string>("")  
  const[ips,setIps] = useState<string[]>(() => {
    const storedIps = localStorage.getItem("ips") 
    return storedIps ? JSON.parse(storedIps) : []
  })

  const [error, setError] = useState<string>("") 

  const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/

  useEffect(() => {
    const storedIps = localStorage.getItem("ips")

    if(storedIps){
      setIps(JSON.parse(storedIps)) 
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ips", JSON.stringify(ips))
  }, [ips]) 
  function  handleAddIP(){
    setError("") 
    if(ip.trim() ==="") return 

    if(!ipRegex.test(ip)){
      setError("Please enter a valid IP adress.")
      return
    }

    if(ips.includes(ip)){ 
      setError("This Ip address is already in the blocklist.")
      return
    }

    setIps([...ips,ip]) 
    setIp("") 
  }

  function handleDeleteIP(deleteIp:string){ 
    const updatedIps = ips.filter((item) => item !== deleteIp) 
    setIps(updatedIps)

  }

  return(
    <div className="min-h-screen bg-slate-100 flex items-start justify-center pt-20"> 
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">IP Blocklist</h1>
        <input
        type="text"
        placeholder="Enter IP Address"
        value={ip}
        onChange={(e) => setIp(e.target.value)} 
        className="border p-2 rounded w-full" 
        ></input>
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
        <button onClick={handleAddIP}
          className="bg-blue-500 text-white py-2 rounded w-full"
        >Add IP</button>
        <ul className="space-y-2">
          {ips.map((item,index) => ( 
            <li key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center"> 
            <span>{item}</span> 
          <button
            onClick={() => handleDeleteIP(item)}
            className="bg-red-500 text-white px-3 py-1 rounded"
            >X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}

export default App
