"use client"

import { useNavigation } from '@/lib/navigation-context'
import { vendors } from '@/lib/sample-data'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function VendorsPage() {
  const { setSelectedRecordId } = useNavigation()

  // OneTrust Secondary Palette - use Mint sparingly
  const riskTierColors = {
    'Critical': 'bg-[#ef4444]/10 text-[#ef4444]',
    'High': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Medium': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'Low': 'bg-[#00B935]/10 text-[#00B935]' // Leaf
  }

  const statusColors = {
    'Active': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'Under Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Inactive': 'bg-[#4b5563]/10 text-[#9ca3af]'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium tracking-[-0.01em] text-white">Vendors</h1>
          <p className="text-sm text-[#9ca3af] leading-[1.2]">Global vendor inventory - accessible across all modules</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50 w-64"
            />
          </div>
          <button className="p-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-[#9ca3af] hover:text-white hover:border-[#3a3d4a] transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-[#9ca3af] hover:text-white hover:border-[#3a3d4a] transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
            <Plus className="w-4 h-4" />
            Add vendor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-white">{vendors.length}</p>
          <p className="text-sm text-[#9ca3af]">Total Vendors</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#ef4444]">{vendors.filter(v => v.riskTier === 'Critical').length}</p>
          <p className="text-sm text-[#9ca3af]">Critical Risk</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#FFEF3C]">{vendors.filter(v => v.status === 'Under Review').length}</p>
          <p className="text-sm text-[#9ca3af]">Under Review</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#00B935]">{vendors.filter(v => v.status === 'Active').length}</p>
          <p className="text-sm text-[#9ca3af]">Active</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e2130]">
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Risk Tier</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Last Assessment</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr 
                key={vendor.id} 
                className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                onClick={() => setSelectedRecordId(vendor.name)}
              >
                <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.id}</td>
                <td className="py-3 px-4 text-sm text-white font-medium">{vendor.name}</td>
                <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.category}</td>
                <td className="py-3 px-4">
                  <span className={cn("text-xs px-2 py-1 rounded", riskTierColors[vendor.riskTier])}>
                    {vendor.riskTier}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={cn("text-xs px-2 py-1 rounded", statusColors[vendor.status])}>
                    {vendor.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.lastAssessment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
