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
import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res) => {
  if (stryMutAct_9fa48("24")) {
    {}
  } else {
    stryCov_9fa48("24");
    try {
      if (stryMutAct_9fa48("25")) {
        {}
      } else {
        stryCov_9fa48("25");
        const {
          userId,
          description,
          picturePath
        } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post(stryMutAct_9fa48("26") ? {} : (stryCov_9fa48("26"), {
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          description,
          picturePath,
          userPicturePath: user.picturePath,
          likes: {},
          comments: stryMutAct_9fa48("27") ? ["Stryker was here"] : (stryCov_9fa48("27"), [])
        }));
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
      }
    } catch (err) {
      if (stryMutAct_9fa48("28")) {
        {}
      } else {
        stryCov_9fa48("28");
        res.status(409).json(stryMutAct_9fa48("29") ? {} : (stryCov_9fa48("29"), {
          message: err.message
        }));
      }
    }
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  if (stryMutAct_9fa48("30")) {
    {}
  } else {
    stryCov_9fa48("30");
    try {
      if (stryMutAct_9fa48("31")) {
        {}
      } else {
        stryCov_9fa48("31");
        const post = await Post.find();
        res.status(200).json(post);
      }
    } catch (err) {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        res.status(404).json(stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
          message: err.message
        }));
      }
    }
  }
};
export const gerUserPosts = async (req, res) => {
  if (stryMutAct_9fa48("34")) {
    {}
  } else {
    stryCov_9fa48("34");
    try {
      if (stryMutAct_9fa48("35")) {
        {}
      } else {
        stryCov_9fa48("35");
        const {
          userId
        } = req.params;
        const post = await Post.find(stryMutAct_9fa48("36") ? {} : (stryCov_9fa48("36"), {
          userId
        }));
        res.status(200).json(post);
      }
    } catch (err) {
      if (stryMutAct_9fa48("37")) {
        {}
      } else {
        stryCov_9fa48("37");
        res.status(404).json(stryMutAct_9fa48("38") ? {} : (stryCov_9fa48("38"), {
          message: err.message
        }));
      }
    }
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  if (stryMutAct_9fa48("39")) {
    {}
  } else {
    stryCov_9fa48("39");
    try {
      if (stryMutAct_9fa48("40")) {
        {}
      } else {
        stryCov_9fa48("40");
        const {
          id
        } = req.params;
        const {
          userId
        } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (stryMutAct_9fa48("42") ? false : stryMutAct_9fa48("41") ? true : (stryCov_9fa48("41", "42"), isLiked)) {
          if (stryMutAct_9fa48("43")) {
            {}
          } else {
            stryCov_9fa48("43");
            post.likes.delete(userId);
          }
        } else {
          if (stryMutAct_9fa48("44")) {
            {}
          } else {
            stryCov_9fa48("44");
            post.likes.set(userId, stryMutAct_9fa48("45") ? false : (stryCov_9fa48("45"), true));
          }
        }
        const updatedPost = await Post.findByIdAndUpdate(id, stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
          likes: post.likes
        }), stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
          new: stryMutAct_9fa48("48") ? false : (stryCov_9fa48("48"), true)
        }));
        res.status(200).json(updatedPost);
      }
    } catch (err) {
      if (stryMutAct_9fa48("49")) {
        {}
      } else {
        stryCov_9fa48("49");
        res.status(404).json(stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
          message: err.message
        }));
      }
    }
  }
};