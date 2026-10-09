import React from 'react';
import { Info, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function DataBadge({ type = 'sample', label, size = 'sm' }) {
  const configs = {
    sample: {
      bg: 'bg-[#C7E2FF]/60 text-[#183B5B] border-[#78B8F5]/40',
      icon: Sparkles,
      defaultLabel: 'Sample Data'
    },
    unverified: {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      icon: AlertTriangle,
      defaultLabel: 'Unverified Community Report'
    },
    verified: {
      bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      icon: ShieldCheck,
      defaultLabel: 'Verified Reference'
    },
    demo: {
      bg: 'bg-blue-50 text-[#2864A6] border-blue-200',
      icon: Info,
      defaultLabel: 'Demonstration Feed'
    }
  };

  const config = configs[type] || configs.sample;
  const IconComponent = config.icon;
  const text = label || config.defaultLabel;

  const sizeClasses = size === 'xs' 
    ? 'text-[11px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5';

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${sizeClasses} select-none`}
      title={`${text} — CityLoom transparent data labeling`}
    >
      <IconComponent className={size === 'xs' ? 'w-3 h-3 flex-shrink-0' : 'w-3.5 h-3.5 flex-shrink-0'} />
      <span>{text}</span>
    </span>
  );
}
