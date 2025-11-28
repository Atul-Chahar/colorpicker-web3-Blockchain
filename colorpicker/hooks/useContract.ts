"use client"

import { useEffect, useState } from "react"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractData {
  currentColor: string
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  setColor: (newColor: string) => Promise<void>
}

export const useColorContract = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { data: color, refetch: refetchColor } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getColor",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetchColor()
    }
  }, [isConfirmed, refetchColor])

  const setColor = async (newColor: string) => {
    const trimmed = newColor.trim()
    if (!trimmed) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "setColor",
        args: [trimmed],
      })
    } catch (err) {
      console.error("Error setting color:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    currentColor: (color as string | undefined) ?? "",
  }

  const actions: ContractActions = {
    setColor,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error: (error as Error | null) ?? null,
  }

  return {
    data,
    actions,
    state,
  }
}
