export function parseUserAgent(userAgent = '') {
  const ua = userAgent.toLowerCase()
  let browser = 'Other'
  if (ua.includes('edg/')) browser = 'Edge'
  else if (ua.includes('firefox/')) browser = 'Firefox'
  else if (ua.includes('chrome/') || ua.includes('crios/')) browser = 'Chrome'
  else if (ua.includes('safari/')) browser = 'Safari'

  let operatingSystem = 'Other'
  if (/iphone|ipad|ipod/.test(ua)) operatingSystem = 'iOS'
  else if (ua.includes('android')) operatingSystem = 'Android'
  else if (ua.includes('windows')) operatingSystem = 'Windows'
  else if (ua.includes('mac os') || ua.includes('macintosh')) operatingSystem = 'macOS'
  else if (ua.includes('linux')) operatingSystem = 'Linux'

  let deviceType = 'Desktop'
  if (/ipad|tablet|kindle/.test(ua)) deviceType = 'Tablet'
  else if (/mobile|iphone|ipod|android/.test(ua)) deviceType = 'Mobile'

  const deviceName = operatingSystem === 'iOS'
    ? (ua.includes('ipad') ? 'iPad' : 'iPhone')
    : operatingSystem === 'Android'
      ? (deviceType === 'Tablet' ? 'Android tablet' : 'Android phone')
      : operatingSystem === 'Windows'
        ? 'Windows PC'
        : operatingSystem === 'macOS'
          ? 'Mac'
          : operatingSystem === 'Linux'
            ? 'Linux PC'
            : `${deviceType} device`

  return { browser, operatingSystem, deviceType, deviceName }
}
