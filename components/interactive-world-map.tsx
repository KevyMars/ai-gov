'use client'

import { useState, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface AssetLocation {
  id: string
  name: string
  coordinates: [number, number]
  assetCount: number
  type: 'internal' | '3rd-party' | 'both'
}

interface DataTransfer {
  from: [number, number]
  to: [number, number]
  id: string
}

const assetLocations: AssetLocation[] = [
  { id: '1', name: 'United States', coordinates: [-95, 38], assetCount: 245, type: 'both' },
  { id: '2', name: 'United Kingdom', coordinates: [-1, 52], assetCount: 89, type: 'internal' },
  { id: '3', name: 'Germany', coordinates: [10, 51], assetCount: 156, type: 'both' },
  { id: '4', name: 'France', coordinates: [2, 47], assetCount: 67, type: '3rd-party' },
  { id: '5', name: 'Netherlands', coordinates: [5, 52], assetCount: 45, type: 'internal' },
  { id: '6', name: 'India', coordinates: [78, 21], assetCount: 312, type: 'both' },
  { id: '7', name: 'Singapore', coordinates: [104, 1], assetCount: 78, type: 'internal' },
  { id: '8', name: 'Australia', coordinates: [134, -25], assetCount: 56, type: '3rd-party' },
  { id: '9', name: 'Japan', coordinates: [138, 36], assetCount: 124, type: 'both' },
  { id: '10', name: 'Brazil', coordinates: [-51, -10], assetCount: 34, type: '3rd-party' },
  { id: '11', name: 'Canada', coordinates: [-106, 56], assetCount: 67, type: 'internal' },
  { id: '12', name: 'South Africa', coordinates: [25, -30], assetCount: 23, type: '3rd-party' },
  { id: '13', name: 'UAE', coordinates: [54, 24], assetCount: 45, type: 'internal' },
  { id: '14', name: 'Ireland', coordinates: [-8, 53], assetCount: 89, type: 'both' },
  { id: '15', name: 'Sweden', coordinates: [15, 62], assetCount: 34, type: 'internal' },
]

// Generate cross-border transfers
const generateTransfers = (): DataTransfer[] => {
  const transfers: DataTransfer[] = []
  const hubLocations = assetLocations.filter(l => l.assetCount > 80)
  
  hubLocations.forEach(hub => {
    assetLocations.forEach(loc => {
      if (hub.id !== loc.id && Math.random() > 0.4) {
        transfers.push({
          id: `${hub.id}-${loc.id}`,
          from: hub.coordinates,
          to: loc.coordinates,
        })
      }
    })
  })
  return transfers
}

interface AssetMapProps {
  onLocationClick?: (location: AssetLocation) => void
  showInternal?: boolean
  show3rdParty?: boolean
}

export function AssetMap({ onLocationClick, showInternal = true, show3rdParty = true }: AssetMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [tooltipContent, setTooltipContent] = useState<{ name: string; count: number; x: number; y: number } | null>(null)

  const filteredLocations = useMemo(() => {
    return assetLocations.filter(loc => {
      if (loc.type === 'both') return showInternal || show3rdParty
      if (loc.type === 'internal') return showInternal
      if (loc.type === '3rd-party') return show3rdParty
      return true
    })
  }, [showInternal, show3rdParty])

  return (
    <div className="relative w-full h-full bg-[#1a1d2a] rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [20, 30],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a2d3a"
                  stroke="#1e2130"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#3a3d4a', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onMouseEnter={() => {
                setHoveredLocation(location.id)
                setTooltipContent({
                  name: location.name,
                  count: location.assetCount,
                  x: 0,
                  y: 0,
                })
              }}
              onMouseLeave={() => {
                setHoveredLocation(null)
                setTooltipContent(null)
              }}
              onClick={() => onLocationClick?.(location)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={Math.max(6, Math.min(14, location.assetCount / 20))}
                fill={
                  location.type === 'internal'
                    ? '#6CEEAD'
                    : location.type === '3rd-party'
                    ? '#0788F7'
                    : '#976FE6'
                }
                fillOpacity={hoveredLocation === location.id ? 1 : 0.7}
                stroke={hoveredLocation === location.id ? '#fff' : 'transparent'}
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {hoveredLocation === location.id && (
                <text
                  textAnchor="middle"
                  y={-15}
                  style={{
                    fontFamily: 'system-ui',
                    fontSize: '10px',
                    fill: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {location.name} ({location.assetCount})
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Asset Type</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6CEEAD]" />
            <span className="text-xs text-white">Internal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0788F7]" />
            <span className="text-xs text-white">3rd Party</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#976FE6]" />
            <span className="text-xs text-white">Both</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CrossBorderMapProps {
  onTransferClick?: (transfer: DataTransfer) => void
  showRelationships?: boolean
}

export function CrossBorderMap({ onTransferClick, showRelationships = true }: CrossBorderMapProps) {
  const [hoveredTransfer, setHoveredTransfer] = useState<string | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  
  const transfers = useMemo(() => generateTransfers(), [])

  return (
    <div className="relative w-full h-full bg-[#1a1d2a] rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [20, 30],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a2d3a"
                  stroke="#1e2130"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#3a3d4a', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Data transfer lines */}
          {showRelationships && transfers.map((transfer) => (
            <Line
              key={transfer.id}
              from={transfer.from}
              to={transfer.to}
              stroke={hoveredTransfer === transfer.id ? '#6CEEAD' : '#0788F7'}
              strokeWidth={hoveredTransfer === transfer.id ? 2 : 1}
              strokeOpacity={hoveredTransfer === transfer.id ? 1 : 0.4}
              strokeLinecap="round"
              strokeDasharray="4 2"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredTransfer(transfer.id)}
              onMouseLeave={() => setHoveredTransfer(null)}
              onClick={() => onTransferClick?.(transfer)}
            />
          ))}

          {/* Location markers */}
          {assetLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <circle
                r={6}
                fill="#fff"
                fillOpacity={0.9}
                stroke={hoveredLocation === location.id ? '#6CEEAD' : '#0788F7'}
                strokeWidth={2}
                className="transition-all duration-200"
                style={{ cursor: 'pointer' }}
              />
              {hoveredLocation === location.id && (
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: 'system-ui',
                    fontSize: '10px',
                    fill: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {location.name}
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-[#0788F7] animate-pulse" />
          <span className="text-white font-medium">{transfers.length}</span>
          <span className="text-[#9ca3af]">Active Transfers</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#0788F7]" style={{ borderTop: '2px dashed #0788F7' }} />
            <span className="text-xs text-white">Data Transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-[#0788F7]" />
            <span className="text-xs text-white">Data Center</span>
          </div>
        </div>
      </div>
    </div>
  )
}
