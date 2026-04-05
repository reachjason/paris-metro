interface StationHeaderProps {
  title: string;
  subtitle: string;
  address: string;
}

export function StationHeader({ title, subtitle, address }: StationHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-sky-500/5 to-transparent border-b border-white/5 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
        <p className="text-base text-sky-300/50 mt-1">{subtitle}</p>
        <p className="text-sm text-white/25 mt-1 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {address}
        </p>
      </div>
    </div>
  );
}
