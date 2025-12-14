// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(stryMutAct_9fa48("109") ? {} : (stryCov_9fa48("109"), {
  firstName: stryMutAct_9fa48("110") ? {} : (stryCov_9fa48("110"), {
    type: String,
    required: stryMutAct_9fa48("111") ? false : (stryCov_9fa48("111"), true),
    min: 2,
    max: 50
  }),
  lastName: stryMutAct_9fa48("112") ? {} : (stryCov_9fa48("112"), {
    type: String,
    required: stryMutAct_9fa48("113") ? false : (stryCov_9fa48("113"), true),
    min: 2,
    max: 50
  }),
  email: stryMutAct_9fa48("114") ? {} : (stryCov_9fa48("114"), {
    type: String,
    required: stryMutAct_9fa48("115") ? false : (stryCov_9fa48("115"), true),
    max: 50,
    unique: stryMutAct_9fa48("116") ? false : (stryCov_9fa48("116"), true)
  }),
  password: stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
    type: String,
    required: stryMutAct_9fa48("118") ? false : (stryCov_9fa48("118"), true),
    min: 5
  }),
  picturePath: stryMutAct_9fa48("119") ? {} : (stryCov_9fa48("119"), {
    type: String,
    default: stryMutAct_9fa48("120") ? "Stryker was here!" : (stryCov_9fa48("120"), "")
  }),
  friends: stryMutAct_9fa48("121") ? {} : (stryCov_9fa48("121"), {
    type: Array,
    default: stryMutAct_9fa48("122") ? ["Stryker was here"] : (stryCov_9fa48("122"), [])
  }),
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number
}), stryMutAct_9fa48("123") ? {} : (stryCov_9fa48("123"), {
  timestamps: stryMutAct_9fa48("124") ? false : (stryCov_9fa48("124"), true)
}));
const User = mongoose.model(stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), 'User'), userSchema);
module.exports = User;