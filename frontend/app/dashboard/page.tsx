'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { LogOut, Wallet, CalendarDays, Zap } from 'lucide-react'

const placeholderStats = [
  { label: 'Wallet balance', value: '₦0.00', icon: Wallet, note: 'Fund in Phase 2' },
  { label: 'Events', value: '0', icon: CalendarDays, note: 'Create in Phase 3' },
  { label: 'Total sprayed', value: '₦0.00', icon: Zap, note: 'Live in Phase 4' },
]

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#C9922A] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#7A6E64] text-sm">
          Not authenticated.{' '}
          <a href="/login" className="text-[#C9922A] font-medium">Log in</a>
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] bg-celebration">
      {/* Top nav */}
      <header className="bg-white border-b border-[#EAE4DC] px-6 py-0 h-14 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C9922A] flex items-center justify-center">
            <span style={{ fontSize: 14 }}>💸</span>
          </div>
          <span className="font-display text-[18px] text-[#1A1410] tracking-[-0.02em]">
            OwambePay
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-medium text-[#1A1410] leading-none">{user.name}</p>
            <p className="text-[11px] text-[#B8AFA8] mt-0.5 capitalize">{user.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FDF6E7] border border-[#EAE4DC] flex items-center justify-center text-[13px] font-semibold text-[#C9922A]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
            <LogOut size={14} strokeWidth={1.75} />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="font-display text-[32px] text-[#1A1410] tracking-[-0.03em] leading-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-[14px] text-[#7A6E64] mt-1">
            Your OwambePay dashboard is ready.
            More features unlock with each phase.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {placeholderStats.map(({ label, value, icon: Icon, note }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[#EAE4DC] rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-[#7A6E64] font-medium tracking-[-0.01em]">{label}</span>
                <div className="w-7 h-7 rounded-lg bg-[#FDF6E7] flex items-center justify-center">
                  <Icon size={14} strokeWidth={1.75} className="text-[#C9922A]" />
                </div>
              </div>
              <p className="text-[22px] font-semibold text-[#1A1410] tracking-[-0.03em] leading-none">
                {value}
              </p>
              <p className="text-[11px] text-[#B8AFA8] mt-1.5">{note}</p>
            </motion.div>
          ))}
        </div>

        {/* Account info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#EAE4DC] rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-[#F3EFE9]">
            <p className="text-[13px] font-semibold text-[#1A1410] tracking-[-0.01em]">Account details</p>
          </div>
          <div className="divide-y divide-[#F3EFE9]">
            {[
              { label: 'Account ID', value: user.id, mono: true },
              { label: 'Email', value: user.email, mono: false },
              { label: 'Role', value: user.role.charAt(0).toUpperCase() + user.role.slice(1), mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <span className="text-[12px] text-[#7A6E64] font-medium shrink-0">{label}</span>
                <span className={`text-[13px] text-[#1A1410] truncate text-right ${mono ? 'font-mono' : ''}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
