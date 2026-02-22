import { HfInference } from "@huggingface/inference" 
import { NextRequest, NextResponse } from "next/server" 

const hf = new HfInference(process.env.HF_TOKEN!) 

export async function POST(req: NextRequest) { 
  const formData = await req.formData() 
  const file = formData.get("image") as File 
  
  if (!file) { 
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 }) 
  } 

  const buffer = await file.arrayBuffer() 
  const response = await hf.imageToImage({ 
    model: "stabilityai/stable-diffusion-x4-upscaler", 
    inputs: new Uint8Array(buffer), 
  }) 

  return new NextResponse(response, { 
    headers: { "Content-Type": "image/png" } 
  }) 
}
