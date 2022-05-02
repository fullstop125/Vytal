import React, { useState, useEffect, useRef } from 'react'
import countryLocales from '../../utils/countryLocales'

const LocaleSettings = ({ ip }) => {
  const [value, setValue] = useState('')
  const [matchIP, setMatchIP] = useState(false)
  const locale = useRef(null)

  useEffect(() => {
    if (ip) {
      locale.current = countryLocales[ip.countryCode].locale

      chrome.storage.sync.get(['locale', 'localeMatchIP'], (result) => {
        result.localeMatchIP && setMatchIP(result.localeMatchIP)

        if (result.localeMatchIP) {
          setValue(locale.current)
          chrome.storage.sync.set({ locale: locale.current })
        } else if (result.locale) {
          setValue(result.locale)
        }
      })
    }
  }, [ip])

  const changeTextValue = (e) => {
    chrome.storage.sync.set({ locale: e.target.value })
    setValue(e.target.value)
    if (matchIP) {
      chrome.storage.sync.set({ localeMatchIP: !matchIP })
      setMatchIP(!matchIP)
    }
  }

  const toggleMatchIP = (e) => {
    chrome.storage.sync.set({ locale: locale.current, localeMatchIP: !matchIP })
    !matchIP && setValue(locale.current)
    setMatchIP(e.target.value)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '12px 0 0 0',
      }}
    >
      <label>
        <input
          type="text"
          value={value}
          onChange={changeTextValue}
          style={{
            width: '120px',
            margin: '0 5px 0 0',
          }}
        />
        Locale
      </label>
      <label>
        <input type="checkbox" checked={matchIP} onChange={toggleMatchIP} />
        Match IP
      </label>
    </div>
  )
}

export default LocaleSettings
