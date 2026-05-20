"use client"

import { cn } from '@/lib/utils'

interface OneTrustLogoProps {
  className?: string
  variant?: 'mark' | 'full'
  color?: 'black' | 'white' | 'mint'
}

// The OneTrust symbol is a stylized fusion of O and T - 
// constructed as a single vertical pillar framed by two dynamic curves
export function OneTrustLogo({ className, variant = 'mark', color = 'white' }: OneTrustLogoProps) {
  const fillColor = {
    black: '#000000',
    white: '#ffffff',
    mint: '#6CEEAD'
  }[color]

  if (variant === 'mark') {
    return (
      <svg 
        viewBox="0 0 48 32" 
        className={cn("h-8 w-auto", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curve */}
        <path
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c4.418 0 8.418-1.79 11.314-4.686V4.686C24.418 1.79 20.418 0 16 0z"
          fill={fillColor}
        />
        {/* Center pillar (negative space creates the T) */}
        <rect x="18" y="0" width="4" height="32" fill={color === 'white' ? '#13151f' : '#ffffff'} />
        {/* Right curve */}
        <path
          d="M32 0c-4.418 0-8.418 1.79-11.314 4.686v22.628C23.582 30.21 27.582 32 32 32c8.837 0 16-7.163 16-16S40.837 0 32 0z"
          fill={fillColor}
        />
        {/* Right inner curve (negative space) */}
        <path
          d="M32 4c-3.314 0-6.314 1.343-8.485 3.515v16.97A11.953 11.953 0 0032 28c6.627 0 12-5.373 12-12S38.627 4 32 4z"
          fill={color === 'white' ? '#13151f' : '#ffffff'}
        />
      </svg>
    )
  }

  // Full logo with wordmark
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        viewBox="0 0 48 32" 
        className="h-8 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curve */}
        <path
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c4.418 0 8.418-1.79 11.314-4.686V4.686C24.418 1.79 20.418 0 16 0z"
          fill={fillColor}
        />
        {/* Center pillar (negative space creates the T) */}
        <rect x="18" y="0" width="4" height="32" fill={color === 'white' ? '#13151f' : '#ffffff'} />
        {/* Right curve */}
        <path
          d="M32 0c-4.418 0-8.418 1.79-11.314 4.686v22.628C23.582 30.21 27.582 32 32 32c8.837 0 16-7.163 16-16S40.837 0 32 0z"
          fill={fillColor}
        />
        {/* Right inner curve (negative space) */}
        <path
          d="M32 4c-3.314 0-6.314 1.343-8.485 3.515v16.97A11.953 11.953 0 0032 28c6.627 0 12-5.373 12-12S38.627 4 32 4z"
          fill={color === 'white' ? '#13151f' : '#ffffff'}
        />
      </svg>
      <span className={cn(
        "text-xl font-medium tracking-tight",
        color === 'white' && "text-white",
        color === 'black' && "text-black",
        color === 'mint' && "text-[#6CEEAD]"
      )}>
        OneTrust
      </span>
    </div>
  )
}

// Simplified mark version that matches the brand guidelines more closely
export function OneTrustMark({ className, color = 'white' }: Omit<OneTrustLogoProps, 'variant'>) {
  const fillColor = {
    black: '#000000',
    white: '#ffffff',
    mint: '#6CEEAD'
  }[color]
  
  const bgColor = {
    black: '#ffffff',
    white: '#13151f',
    mint: '#000000'
  }[color]

  return (
    <svg 
      viewBox="0 0 64 40" 
      className={cn("h-8 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left half-circle with inner white space */}
      <path
        d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20c5.523 0 10.523-2.239 14.142-5.858V5.858C30.523 2.239 25.523 0 20 0z"
        fill={fillColor}
      />
      {/* Left inner arc (creates the C shape) */}
      <path
        d="M20 6c-7.732 0-14 6.268-14 14s6.268 14 14 14c3.866 0 7.366-1.568 9.899-4.101V10.101C27.366 7.568 23.866 6 20 6z"
        fill={bgColor}
      />
      
      {/* Center vertical bar (the T pillar) */}
      <rect x="30" y="0" width="4" height="40" fill={fillColor} />
      
      {/* Right half-circle with inner white space */}
      <path
        d="M44 0c-5.523 0-10.523 2.239-14.142 5.858v28.284C33.477 37.761 38.477 40 44 40c11.046 0 20-8.954 20-20S55.046 0 44 0z"
        fill={fillColor}
      />
      {/* Right inner arc (creates the reverse C shape) */}
      <path
        d="M44 6c-3.866 0-7.366 1.568-9.899 4.101v19.798C36.634 32.432 40.134 34 44 34c7.732 0 14-6.268 14-14S51.732 6 44 6z"
        fill={bgColor}
      />
    </svg>
  )
}
