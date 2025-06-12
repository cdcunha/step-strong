'use client';

export function VersionDisplay() {
  // Get version from environment or use a fallback
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0';
  
  // Format the build time for display
  const formatBuildTime = (isoString: string) => {
    if (!isoString) return '';
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
      console.error('Error formatting build time:', e);
      return '';
    }
  };

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString();
  const formattedTime = formatBuildTime(buildTime);
  const displayDate = formattedTime ? new Date(buildTime).toLocaleDateString() : '';

  return (
    <span className="version-display">
      v{appVersion}
      {formattedTime && (
        <span 
          className="text-xs opacity-75 ml-2" 
          title={`Built on ${formattedTime}`}
        >
          ({displayDate})
        </span>
      )}
    </span>
  );
}
