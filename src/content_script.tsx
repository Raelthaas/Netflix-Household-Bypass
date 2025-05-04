chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  
});


function getPlayer() {
  // uses the `netflix` object, a global variable exposed by the web app
  const videoPlayer = getDeepProperty(
    //@ts - ignore
    window['netflix'],
    "appContext.state.playerApp.getAPI().videoPlayer"
  );
  if (
    videoPlayer &&
    videoPlayer.getVideoPlayerBySessionId &&
    videoPlayer.getAllPlayerSessionIds
  ) {
    const allSessionIds = videoPlayer.getAllPlayerSessionIds();
    const watchSessionIds = allSessionIds.filter((sid: any) =>
      sid.startsWith("watch-")
    );
    if (watchSessionIds.length > 0) {
      return videoPlayer.getVideoPlayerBySessionId(watchSessionIds[0]); // we can't differentiate them though
    } else if (allSessionIds.length > 0) {
      return videoPlayer.getVideoPlayerBySessionId(allSessionIds[0]); // otherwise just return the first one
    }
  }
  return null;
}

/**
 * Gets a nested property inside an object.
 */
function getDeepProperty(obj: any, props: any) {
  if (typeof obj === "undefined") {
    return null;
  } else if (typeof obj !== "object") {
    return obj;
  }
  var cur = obj;
  for (var key of props.split(".")) {
    const isFunction = key.endsWith("()");
    const attrName = isFunction ? key.substring(0, key.length - 2) : key;
    if (!cur[attrName]) {
      return null;
    }
    cur = cur[attrName];
    if (isFunction && typeof cur === "function") {
      cur = cur();
    }
  }
  return cur;
}