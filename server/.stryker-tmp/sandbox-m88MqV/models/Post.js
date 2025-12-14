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
import mongoose from "mongoose";
const postSchema = mongoose.Schema(stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
  userId: stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
    type: String,
    required: stryMutAct_9fa48("98") ? false : (stryCov_9fa48("98"), true)
  }),
  firstName: stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
    type: String,
    required: stryMutAct_9fa48("100") ? false : (stryCov_9fa48("100"), true)
  }),
  lastName: stryMutAct_9fa48("101") ? {} : (stryCov_9fa48("101"), {
    type: String,
    required: stryMutAct_9fa48("102") ? false : (stryCov_9fa48("102"), true)
  }),
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
    type: Map,
    of: Boolean
  }),
  comments: stryMutAct_9fa48("104") ? {} : (stryCov_9fa48("104"), {
    type: Array,
    default: stryMutAct_9fa48("105") ? ["Stryker was here"] : (stryCov_9fa48("105"), [])
  })
}), stryMutAct_9fa48("106") ? {} : (stryCov_9fa48("106"), {
  timestamps: stryMutAct_9fa48("107") ? false : (stryCov_9fa48("107"), true)
}));
const Post = mongoose.model(stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "Post"), postSchema);
export default Post;