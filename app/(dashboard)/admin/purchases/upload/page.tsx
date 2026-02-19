"use client"
import { useState } from "react"

export default function UploadPurchasePage() {
  const [result,setResult] = useState<any>(null)

  async function handleUpload(e:any){
    e.preventDefault()
    const file = e.target.file.files[0]

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/purchases/upload",{
      method:"POST",
      body: formData
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Upload Purchase Excel</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" name="file" accept=".xlsx,.xls" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Upload File
        </button>
      </form>

      {result && (
        <div className="bg-white p-4 rounded shadow">
          <p>✅ Success rows: {result.success}</p>
          <p>❌ Failed rows: {result.failed.length}</p>
        </div>
      )}
    </div>
  )
}
