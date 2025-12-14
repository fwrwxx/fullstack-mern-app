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
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER USER */
export const register = async (req, res) => {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    try {
      if (stryMutAct_9fa48("1")) {
        {}
      } else {
        stryCov_9fa48("1");
        const {
          firstName,
          lastName,
          email,
          password,
          picturePath,
          friends,
          location,
          occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User(stryMutAct_9fa48("2") ? {} : (stryCov_9fa48("2"), {
          firstName,
          lastName,
          email,
          password: passwordHash,
          picturePath,
          friends,
          location,
          occupation,
          viewedProfile: Math.floor(stryMutAct_9fa48("3") ? Math.random() / 10000 : (stryCov_9fa48("3"), Math.random() * 10000)),
          impressions: Math.floor(stryMutAct_9fa48("4") ? Math.random() / 10000 : (stryCov_9fa48("4"), Math.random() * 10000))
        }));
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      }
    } catch (err) {
      if (stryMutAct_9fa48("5")) {
        {}
      } else {
        stryCov_9fa48("5");
        res.status(500).json(stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
          error: err.message
        }));
      }
    }
    ;
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  if (stryMutAct_9fa48("7")) {
    {}
  } else {
    stryCov_9fa48("7");
    try {
      if (stryMutAct_9fa48("8")) {
        {}
      } else {
        stryCov_9fa48("8");
        const {
          email,
          password
        } = req.body;
        const user = await User.findOne(stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
          email: email
        }));
        if (stryMutAct_9fa48("12") ? false : stryMutAct_9fa48("11") ? true : stryMutAct_9fa48("10") ? user : (stryCov_9fa48("10", "11", "12"), !user)) return res.status(400).json(stryMutAct_9fa48("13") ? {} : (stryCov_9fa48("13"), {
          msg: stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "User does not exist. ")
        }));
        const isMatch = await bcrypt.compare(password, user.password);
        if (stryMutAct_9fa48("17") ? false : stryMutAct_9fa48("16") ? true : stryMutAct_9fa48("15") ? isMatch : (stryCov_9fa48("15", "16", "17"), !isMatch)) return res.status(400).json(stryMutAct_9fa48("18") ? {} : (stryCov_9fa48("18"), {
          msg: stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "Invalid credentials. ")
        }));
        const token = jwt.sign(stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
          id: user._id
        }), process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json(stryMutAct_9fa48("21") ? {} : (stryCov_9fa48("21"), {
          token,
          user
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("22")) {
        {}
      } else {
        stryCov_9fa48("22");
        res.status(500).json(stryMutAct_9fa48("23") ? {} : (stryCov_9fa48("23"), {
          error: err.message
        }));
      }
    }
    ;
  }
};