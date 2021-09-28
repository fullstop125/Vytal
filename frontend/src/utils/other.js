import { checkWebWorker } from './common';

const detectTor = () => {
  const date = new Date();
  if (
    navigator.plugins.length === 0 &&
    date.getTimezoneOffset() === 0 &&
    window.outerWidth === window.screen.availWidth &&
    window.outerHeight === window.screen.availHeight
  ) {
    return true;
  }
  return false;
};

const checkDatePrototype = () => {
  if (!Date.prototype.setDate.toString().includes('[native code]')) {
    return 'Failed Date.prototype.setDate.toString()';
  }
  return null;
};

// Returns object with location data
const getOther = (battery, adBlock, workerData) => [
  {
    key: 'Brave browser',
    value: navigator.brave ? 'True' : 'False',
    issues: [checkWebWorker],
  },
  {
    key: 'Tor browser',
    value: detectTor() ? 'True' : 'False',
    issues: [],
  },
  {
    key: 'Adblock',
    value: adBlock ? 'True' : 'False',
    issues: [],
  },
  {
    key: 'Date',
    value: new Date().toString(),
    issues: [checkDatePrototype()],
  },
  {
    key: 'Timezone offset',
    value: new Date().getTimezoneOffset(),
    issues: [
      checkDatePrototype(),
      checkWebWorker(new Date().getTimezoneOffset(), workerData.timezoneOffset),
    ],
  },
  {
    key: 'Battery level',
    value: `${Math.round(battery.level * 100)}%`,
    issues: [],
  },
  {
    key: 'Battery status',
    value: battery.charging ? 'Charging' : 'Not charging',
    issues: [],
  },
];

export default getOther;
