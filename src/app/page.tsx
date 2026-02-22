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
    const blob = await res.blob() 
    const url = URL.createObjectURL(blob) 
    setResult(url) 
    setLoading(false) 
  } 

  return ( 
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"> 
      <h1 className="text-4xl font-bold mb-8"> AI Photo Enhancer 4K </h1> 
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files?.[0] || null)} 
        className="mb-6" 
      /> 
      <button 
        onClick={handleUpload} 
        disabled={loading}
        className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50" 
      > 
        {loading ? "Processing..." : "Enhance to 4K"} 
      </button> 
      {result && ( 
        <div className="mt-10"> 
          <img src={result} className="rounded-xl shadow-xl max-w-full" /> 
          <a href={result} download className="block mt-4 text-purple-400 text-center text-xl"> Download 4K Image </a> 
        </div> 
      )} 
    </main> 
  ) 
}
