'use client'

import { useState } from 'react'
import { CopyIcon, CheckIcon } from '@phosphor-icons/react/dist/ssr'

export default function CopyAddressButton({ address }: { address: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="cursor-pointer text-base-content/40 hover:text-base-content/70 transition-colors"
            aria-label="Copy address to clipboard"
        >
            {copied ? (
                <CheckIcon weight="bold" className="w-4 h-4" />
            ) : (
                <CopyIcon weight="bold" className="w-4 h-4" />
            )}
        </button>
    )
}
