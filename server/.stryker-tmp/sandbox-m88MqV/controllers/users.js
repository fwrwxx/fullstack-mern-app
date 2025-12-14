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
import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
  if (stryMutAct_9fa48("51")) {
    {}
  } else {
    stryCov_9fa48("51");
    try {
      if (stryMutAct_9fa48("52")) {
        {}
      } else {
        stryCov_9fa48("52");
        const {
          id
        } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
      }
    } catch (err) {
      if (stryMutAct_9fa48("53")) {
        {}
      } else {
        stryCov_9fa48("53");
        res.status(404).json(stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
          error: err.message
        }));
      }
    }
  }
};
export const getUserFriends = async (req, res) => {
  if (stryMutAct_9fa48("55")) {
    {}
  } else {
    stryCov_9fa48("55");
    const {
      id
    } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(user.friends.map(stryMutAct_9fa48("56") ? () => undefined : (stryCov_9fa48("56"), id => User.findById(id))));
    const formattedFriends = friends.map(({
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picturePath
    }) => {
      if (stryMutAct_9fa48("57")) {
        {}
      } else {
        stryCov_9fa48("57");
        return stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath
        });
      }
    });
    res.status(200).json(formattedFriends);
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  if (stryMutAct_9fa48("59")) {
    {}
  } else {
    stryCov_9fa48("59");
    try {
      if (stryMutAct_9fa48("60")) {
        {}
      } else {
        stryCov_9fa48("60");
        const {
          id,
          friendId
        } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : (stryCov_9fa48("61", "62"), user.friends.includes(friendId))) {
          if (stryMutAct_9fa48("63")) {
            {}
          } else {
            stryCov_9fa48("63");
            user.friends = stryMutAct_9fa48("64") ? user.friends : (stryCov_9fa48("64"), user.friends.filter(stryMutAct_9fa48("65") ? () => undefined : (stryCov_9fa48("65"), id => stryMutAct_9fa48("68") ? id === friendId : stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66", "67", "68"), id !== friendId))));
            friend.friends = stryMutAct_9fa48("69") ? friend.friends : (stryCov_9fa48("69"), friend.friends.filter(stryMutAct_9fa48("70") ? () => undefined : (stryCov_9fa48("70"), id => stryMutAct_9fa48("73") ? id === id : stryMutAct_9fa48("72") ? false : stryMutAct_9fa48("71") ? true : (stryCov_9fa48("71", "72", "73"), id !== id))));
          }
        } else {
          if (stryMutAct_9fa48("74")) {
            {}
          } else {
            stryCov_9fa48("74");
            user.friends.push(friendId);
            friend.friends.push(id);
          }
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(user.friends.map(stryMutAct_9fa48("75") ? () => undefined : (stryCov_9fa48("75"), id => User.findById(id))));
        const formattedFriends = friend.map(({
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath
        }) => {
          if (stryMutAct_9fa48("76")) {
            {}
          } else {
            stryCov_9fa48("76");
            return stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
              _id,
              firstName,
              lastName,
              occupation,
              location,
              picturePath
            });
          }
        });
        res.status(200).json(formattedFriends);
      }
    } catch (err) {
      if (stryMutAct_9fa48("78")) {
        {}
      } else {
        stryCov_9fa48("78");
        res.status(404).json(stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
          error: err.message
        }));
      }
    }
  }
};