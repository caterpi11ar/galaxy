interface OnlineStatusProps {
  onlineCount: number
}

export function OnlineStatus({ onlineCount }: OnlineStatusProps) {
  return (
    <div className="absolute top-4 right-4 bg-ui-surface border-2 border-ui-border p-3 animate-pixel-fade-in">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-stellar-green animate-pixel-pulse"></div>
        <span className="text-ui-text-secondary">在线:</span>
        <span className="text-stellar-green">{onlineCount}</span>
      </div>
    </div>
  )
}
