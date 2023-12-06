"use strict";

// Fixes issues with older versions of Chrome in production,
// e.g. https://celest.sentry.io/issues/4704582275/
let targets;
if (process.env.NODE_ENV === 'production') {
  targets = { chrome: '58' };
}

module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  targets,
};
