"use client"
import { useState } from "react"

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append("image", image)

    const res = await fetch("/api/enhance", { method: "POST", body: formData })
    if (res.ok) {
      const blob = await res.blob()
      setResult(URL.createObjectURL(blob))
    }
    setLoading(false)
  }

  return (
    <main style={{background:'#000', color:'#fff', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px', fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'2rem', marginBottom:'20px'}}>4K AI UPSCALER</h1>
      <div style={{border:'2px dashed #444', padding:'30px', borderRadius:'15px', textAlign:'center'}}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} style={{marginBottom:'20px'}} />
        <br />
        <button 
          onClick={handleUpload} 
          disabled={loading}
          style={{background:'#9333ea', color:'#fff', border:'none', padding:'12px 24px', borderRadius:'10px', cursor:'pointer', fontWeight:'bold'}}
        >
          {loading ? "ОБРАБОТКА..." : "УЛУЧШИТЬ ДО 4K"}
        </button>
      </div>
      {result && (
        <div style={{marginTop:'30px', textAlign:'center'}}>
          <img src={result} style={{maxWidth:'100%', borderRadius:'10px', border:'1px solid #333'}} />
          <a href={result} download="4k_image.png" style={{display:'block', marginTop:'15px', color:'#a855f7'}}>СКАЧАТЬ РЕЗУЛЬТАТ</a>
        </div>
      )}
    </main>
  )
}
