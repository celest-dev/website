"use strict";

// Fixes issues with older browser versions in production,
// - https://celest.sentry.io/issues/4704582275/
// - https://celest.sentry.io/issues/4723127744/
let targets = {};
if (process.env.NODE_ENV === 'production') {
  targets = { chrome: '58', firefox: '16' };
}

module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  targets,
};
