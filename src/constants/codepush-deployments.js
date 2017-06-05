// @flow

module.exports = {
  production: [
    {
      name: 'Production',
      key: 'LK2pdqNyAWGXr6-C-Ljk4kRTkgVJ4JUJX0auf',
      displayName: 'Prod',
      description: 'self-explanatory',
    },
  ],
  staging: [
    {
      name: 'Staging',
      key: '5yYuBL9RjePwiiuev-NzBhY1h-V-4JUJX0auf',
      displayName: 'Staging',
      description: 'fallback deployment that should mirror the latest version pushed to TestFlight',
    },
    {
      name: 'StagingBeta',
      key: 'biT1JBowMsBtOYS8Rw8EzzHK6Pko4JUJX0auf',
      displayName: 'Staging-beta',
      description: 'self-explanatory',
    },
    {
      name: 'StagingPavel',
      key: 'g_E2F2rZsKeSNz5S9R56BJ7yicyq4JUJX0auf',
      displayName: 'Staging-Pavel',
      description: "Pavel's channel",
    },
    {
      name: 'StagingEric',
      key: 'P6GeQtV8VEPJCP2z-cUbt6mRcWP44JUJX0auf',
      displayName: 'Staging-Eric',
      description: "Eric's channel",
    },
  ],
  local: [
    {
      name: 'LocalTest',
      key: 'JJGyWDPM2J2pfSNf3vwim1fERlvp4JUJX0auf',
      displayName: 'Local1',
      description: 'use this to test the CodePush process *only* on your local machine',
    },
    {
      name: 'LocalTest2',
      key: 'rlE2Ld9i_ZOecfyCwqYek_CQxPqd4JUJX0auf',
      displayName: 'Local2',
      description: 'another (temp) local test deployment',
    },
  ],
};
