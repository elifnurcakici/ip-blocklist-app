import {useEffect, useState} from "react"

function App(){
  const[ip, setIp] = useState<string>("")  
  const[ips,setIps] = useState<string[]>(() => {
    const storedIps = localStorage.getItem("ips") // localStorage içindeki "ips" verisini alır

    return storedIps ? JSON.parse(storedIps) : []// veri varsa parse edip array olarak döndür yoksa boş array döndür
  })

  const [error, setError] = useState<string>("") 

  const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/

  useEffect(() => {
    const storedIps = localStorage.getItem("ips") // localStorage içinden "ips" anahtarına ait veriyi alır.

    if(storedIps){ // Eğer storeIps null değilse
      setIps(JSON.parse(storedIps)) // localStorage'dan alınan veri string formatında olduğu için JSON.parse ile tekrar array'e çeviriyoruz.
    }
  }, []) // Bu effect component sadece component ilk yüklendiğinde 1 kez çalışır

  useEffect(() => {
    localStorage.setItem("ips", JSON.stringify(ips)) // array string'e çevrilir ve ips statei her değiştiğinde localStorage'a kaydedilir
  }, [ips]) // ips değişirse bu effect tekrar çalışır.
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
    <div className="min-h-screen bg-slate-100 flex items-start justify-center pt-20"> {/*min-h-screen : ekranın tamamını kapla, bg-slate-100 : arka plan rengi, flex:flexbox aktif, items-start:üstte hizala, justify-center: yatay ortala, pt-20: üstten padding*/}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">{/*Kart görünümü- bg-white: beyaz arka plan, p-6: padding, rounded-xl:köşeleri yuvarla, shadow-md:hafif gölge, w-full: genişliği full, max-w-md: maksimum genişlik*/}
        <h1 className="text-2xl font-bold text-center">IP Blocklist</h1>
        <input
        type="text"
        placeholder="Enter IP Address"
        value={ip}
        onChange={(e) => setIp(e.target.value)} // kullanıcı yazdıkça state güncellenir.
        className="border p-2 rounded w-full" // border:kenarlık, p-2:padding, rounded:köşeleri yuvarlama, w-full:genişliği full
        ></input>
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
        <button onClick={handleAddIP} // tıklanınca fonksiyon çalışır
          className="bg-blue-500 text-white py-2 rounded w-full"
        >Add IP</button>
        <ul className="space-y-2">
          {ips.map((item,index) => ( 
            <li key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center"> {/* React için uniq key, index kullanılarak benzersiz bir key oluşturulur.*/}
            <span>{item}</span> {/*ips listesindeki her bir ip adresi için bir liste oluşturulur. map fonksiyonu ile her bir ip adresi item olarak alınır ve index de benzersiz bir key olarak kullanılır*/}
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