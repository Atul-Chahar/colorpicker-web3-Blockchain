"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useColorContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const [newColor, setNewColor] = useState("")

  const { data, actions, state } = useColorContract()

  const handleSetColor = async () => {
    const value = newColor.trim()
    if (!value) return

    try {
      await actions.setColor(value)
      setNewColor("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Color Contract</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to read and update the contract color.
          </p>
        </div>
      </div>
    )
  }

  const canSetColor = !!newColor.trim()

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Color Contract</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Read and update a simple on-chain color value stored in the contract.
          </p>
        </div>

        {/* Contract Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Current Color</p>
            <p className="text-2xl font-semibold text-foreground break-all">
              {data.currentColor || "Not set"}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Preview</p>
            <div
              className="h-12 w-full rounded-md border border-border"
              style={{ backgroundColor: data.currentColor || "transparent" }}
            />
            <p className="text-xs text-muted-foreground">
              The preview uses the current value as a CSS color (e.g. <code>red</code>,{" "}
              <code>#ff0000</code>, <code>rgb(255,0,0)</code>).
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
            </div>
            <label className="block text-sm font-medium text-foreground mb-2">Set New Color</label>
            <input
              type="text"
              placeholder="e.g. red, #ff0000, rgb(255,0,0)"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSetColor}
            disabled={state.isLoading || state.isPending || !canSetColor}
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {state.isLoading || state.isPending ? "Updating Color..." : "Update Color"}
          </button>
        </div>

        {/* Status Messages */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
