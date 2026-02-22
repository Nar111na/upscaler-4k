import { HfInference } from "@huggingface/inference"
import { NextRequest, NextResponse } from "next/server"

// Этот ключ мы добавим в настройках Vercel позже
const hf = new HfInference(process.env.HF_TOKEN!)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("image") as File
    
    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    
    // Используем модель Stability AI для апскейла
    const response = await hf.imageToImage({
      model: "stabilityai/stable-diffusion-x4-upscaler",
      inputs: new Uint8Array(buffer),
    })

    return new NextResponse(response, {
      headers: { "Content-Type": "image/png" }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка нейросети" }, { status: 500 })
  }
}
