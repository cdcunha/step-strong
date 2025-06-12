'use client';

export function VersionDisplay() {
  // Format the build time for display
  const formatBuildTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <span className="version-display">
      v{process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0'}
      {process.env.NEXT_PUBLIC_BUILD_TIME && (
        <span className="text-xs opacity-75 ml-2" title={`Built on ${formatBuildTime(process.env.NEXT_PUBLIC_BUILD_TIME)}`}>
          ({new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleDateString()})
        </span>
      )}
    </span>
  );
}
