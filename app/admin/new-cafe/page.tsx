'use client'

import { useState } from 'react'
import { createCafe } from './actions'

export default function NewCafePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      let imageUrl = null

      // If an image was selected, upload it to Vercel Blob first
      if (file) {
        const fileData = new FormData()
        fileData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        })

        if (!res.ok) {
          const errData = await res.json()
          throw new Error(errData.error || 'Failed to upload image')
        }

        const blob = await res.json()
        imageUrl = blob.url
      }

      // Then save all the data to Postgres
      await createCafe(formData, imageUrl)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Add New Cafe</h1>
        <p className="text-base-content/70">Create a new cafe entry and upload a photo directly to Vercel Blob.</p>
      </div>

      {error && (
        <div className="alert alert-error mb-6 shadow-sm rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm">
        
        {/* Core Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-base-200 pb-2">Core Details</h2>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Cafe Name *</span></label>
            <input type="text" name="name" required className="input input-bordered w-full bg-base-200/50" placeholder="e.g. Matchstick Coffee" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Street Address *</span>
                <span className="label-text-alt text-base-content/50">(AI Automation Planned)</span>
              </label>
              <input type="text" name="street" required className="input input-bordered w-full bg-base-200/50" placeholder="e.g. 123 Main St" />
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">City *</span></label>
              <select name="city" className="select select-bordered w-full bg-base-200/50">
                <option value="Vancouver">Vancouver</option>
                <option value="Burnaby">Burnaby</option>
                <option value="Richmond">Richmond</option>
                <option value="Surrey">Surrey</option>
                <option value="Coquitlam">Coquitlam</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Latitude *</span>
              <span className="label-text-alt text-base-content/50">(AI Automation Planned)</span>
            </label>
            <input type="number" step="any" name="latitude" required className="input input-bordered w-full bg-base-200/50" placeholder="e.g. 49.2827" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Hours</span>
              <span className="label-text-alt text-base-content/50">(AI Automation Planned)</span>
            </label>
            <input type="text" name="hours" className="input input-bordered w-full bg-base-200/50" placeholder="e.g. 8:00 AM - 5:00 PM" />
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-base-200 pb-2">Features</h2>
          <div className="flex gap-6">
            <label className="cursor-pointer label gap-2 justify-start">
              <input type="checkbox" name="hasWifi" className="checkbox checkbox-primary" />
              <span className="label-text">Has Wi-Fi</span>
            </label>
            <label className="cursor-pointer label gap-2 justify-start">
              <input type="checkbox" name="isLaptopFriendly" className="checkbox checkbox-primary" />
              <span className="label-text">Laptop Friendly</span>
            </label>
          </div>
        </section>

        {/* First Review */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-base-200 pb-2">Your Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">What did you order? *</span></label>
              <input type="text" name="order" required className="input input-bordered w-full bg-base-200/50" placeholder="e.g. Flat White" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Price Point (1-5) *</span></label>
              <input type="number" name="pricePoint" min="1" max="5" defaultValue="3" required className="input input-bordered w-full bg-base-200/50" />
            </div>
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Thoughts *</span></label>
            <textarea name="thoughts" required className="textarea textarea-bordered h-24 bg-base-200/50" placeholder="What did you think of this place?"></textarea>
          </div>

          <label className="cursor-pointer label gap-2 justify-start">
            <input type="checkbox" name="recommended" defaultChecked className="toggle toggle-success" />
            <span className="label-text font-medium">I recommend this cafe</span>
          </label>
        </section>

        {/* Image Upload */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-base-200 pb-2">Upload Photo</h2>
          <div className="form-control">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs" 
            />
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4 border-t border-base-200">
          <button 
            type="submit" 
            disabled={isUploading}
            className="btn btn-primary w-full md:w-auto px-8"
          >
            {isUploading ? <span className="loading loading-spinner"></span> : 'Save Cafe & Upload'}
          </button>
        </div>
        
      </form>
    </div>
  )
}
