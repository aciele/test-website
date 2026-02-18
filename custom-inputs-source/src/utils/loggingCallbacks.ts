/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helper function to extract selected items from DOM diffs
 * Supports multiple strategies for different UI libraries
 */
function extractSelectionFromDiffs(diffs: any[]): string[] | null {
  if (!diffs || !diffs.length) return null;

  let bestResult: string[] | null = null;

  for (let i = 0; i < diffs.length; i++) {
    const root = diffs[i].root;
    if (!root) continue;

    // Strategy 1: ARIA listbox with aria-selected="true"
    const ariaMatches = root.match(
      /aria-label="([^"]+)"[^>]*aria-selected="true"/g,
    );
    if (ariaMatches && ariaMatches.length > 0) {
      const items: string[] = [];
      for (let j = 0; j < ariaMatches.length; j++) {
        const label = ariaMatches[j].match(/aria-label="([^"]+)"/);
        if (label) items.push(label[1]);
      }
      if (
        items.length > 0 &&
        (!bestResult || items.length > bestResult.length)
      ) {
        bestResult = items;
      }
    }

    // Strategy 2: selection-item elements with title attribute (multiselect tags)
    let titleMatches = root.match(
      /title="([^"]+)"[^>]*class="[^"]*selection-item"/g,
    );
    if (!titleMatches) {
      titleMatches = root.match(
        /class="[^"]*selection-item"[^>]*title="([^"]+)"/g,
      );
    }
    if (titleMatches && titleMatches.length > 0) {
      const items2: string[] = [];
      for (let k = 0; k < titleMatches.length; k++) {
        const t = titleMatches[k].match(/title="([^"]+)"/);
        if (t) items2.push(t[1]);
      }
      if (
        items2.length > 0 &&
        (!bestResult || items2.length > bestResult.length)
      ) {
        bestResult = items2;
      }
    }

    // Strategy 3: title attributes in diff roots containing role="combobox"
    if (root.indexOf('role="combobox"') !== -1) {
      const comboTitles = root.match(/title="([^"]+)"/g);
      if (comboTitles && comboTitles.length > 0) {
        const items3: string[] = [];
        for (let m = 0; m < comboTitles.length; m++) {
          const ct = comboTitles[m].match(/title="([^"]+)"/);
          if (ct) items3.push(ct[1]);
        }
        if (
          items3.length > 0 &&
          (!bestResult || items3.length > bestResult.length)
        ) {
          bestResult = items3;
        }
      }
    }
  }

  return bestResult;
}

/**
 * Resolves an xpath-like array path to a DOM element
 */
function resolveXpath(xpathId: string | any[]): HTMLElement | null {
  let path: any[];
  try {
    path = typeof xpathId === "string" ? JSON.parse(xpathId) : xpathId;
  } catch {
    return null;
  }
  if (!Array.isArray(path)) return null;

  let el: any = document;
  for (let i = 0; i < path.length; i++) {
    const step = path[i];
    const tag = step[0];
    const idx = step[1];

    if (tag === "html") {
      el = document.documentElement;
    } else if (tag === "root" || tag === "#root") {
      el = document.getElementById("root") || document.documentElement;
    } else if (idx !== undefined) {
      const children = el.children;
      let count = 0;
      let found = false;
      for (let j = 0; j < children.length; j++) {
        if (children[j].tagName.toLowerCase() === tag) {
          if (count === idx) {
            el = children[j];
            found = true;
            break;
          }
          count++;
        }
      }
      if (!found) return null;
    }
  }
  return el;
}

/**
 * Resolves a target element by ID or xpath
 */
function resolveTargetElement(targetId: string): HTMLElement | null {
  if (typeof targetId === "string" && targetId.charAt(0) === "[") {
    return resolveXpath(targetId);
  } else if (typeof targetId === "string") {
    return document.getElementById(targetId);
  }
  return null;
}

/**
 * Raw logging callback - logs type 4 and 12 messages directly
 */
export const rawLogCallback: any = {
  enabled: true,
  cbType: "messageRedirect",
  cbFunction: (function () {
    let lastCount = 0;

    return function (_msg: string, msgObj: any) {
      if (msgObj && msgObj.count > lastCount) {
        lastCount = msgObj.count;
        if (msgObj.type === 4 || msgObj.type === 12) {
          console.log(msgObj);
        }
      }
      return msgObj;
    };
  })(),
};

/**
 * State detection callback - logs with detailed state change tracking
 */
export const stateDetectionCallback: any = {
  enabled: true,
  cbType: "messageRedirect",
  cbFunction: (function () {
    let lastCount = 0;
    const stateMap: Record<string, string> = {};

    return function (_msg: string, msgObj: any) {
      if (msgObj && msgObj.count > lastCount) {
        lastCount = msgObj.count;
        if (msgObj.type === 4 && msgObj.event && msgObj.target) {
          console.group("Message type " + msgObj.type);
          const resolvedEl =
            msgObj.event.type && msgObj.target.id
              ? resolveTargetElement(msgObj.target.id)
              : null;
          console.log("Event type:", msgObj.event.type);
          console.log(
            msgObj.target.id && msgObj.target.id.charAt(0) === "["
              ? "Xpath:"
              : "Target ID:",
            msgObj.target.id,
          );
          if (resolvedEl !== null) {
            console.log("HTML element:", resolvedEl);
          }
          console.log("Current state:", msgObj.target.currState);

          // Detect value changes via SDK's native currState/prevState
          if (
            msgObj.target.currState &&
            msgObj.target.prevState &&
            msgObj.target.currState.innerText !==
              msgObj.target.prevState.innerText
          ) {
            console.group(
              "[STATE CHANGE] <" +
                msgObj.target.tlType +
                "> on " +
                msgObj.event.type,
            );
            console.log("element:", msgObj.target.id);
            console.log(
              'previous: "' + msgObj.target.prevState.innerText + '"',
            );
            console.log(
              'current: "' + msgObj.target.currState.innerText + '"',
            );
            console.groupEnd();
            stateMap[msgObj.target.id] = msgObj.target.currState.innerText;
          }

          // Track innerText changes (works for MUI, shadcn, Chakra)
          const text =
            msgObj.target.attributes && msgObj.target.attributes.innerText;
          const id = msgObj.target.id;
          if (text && id) {
            const prev = stateMap[id];
            if (prev !== undefined && prev !== text) {
              console.group(
                "[STATE CHANGE] <" +
                  msgObj.target.tlType +
                  "> on " +
                  msgObj.event.type,
              );
              console.log("element:", id);
              console.log('previous: "' + prev + '"');
              console.log('current: "' + text + '"');
              console.groupEnd();
            } else if (
              prev === undefined &&
              msgObj.target.currState &&
              msgObj.target.currState.innerText &&
              msgObj.event.type === "blur"
            ) {
              console.group(
                "[STATE CHANGE] <" +
                  msgObj.target.tlType +
                  "> first value detected on " +
                  msgObj.event.type,
              );
              console.log("element:", id);
              console.log('current: "' + text + '"');
              console.groupEnd();
            }
            stateMap[id] = text;
          }

          console.log("Based on msgObj", msgObj);
          console.groupEnd();
        }

        // Parse Type 12 DOM captures for selection state (covers Ant Design)
        if (
          msgObj.type === 12 &&
          msgObj.domCapture &&
          msgObj.domCapture.diffs
        ) {
          const selected = extractSelectionFromDiffs(msgObj.domCapture.diffs);
          if (selected && selected.length > 0) {
            console.group("Message type " + msgObj.type);
            console.log("Selected items:", selected);
            console.log("Based on msgObj", msgObj);
            console.groupEnd();
          }
        }
      }
      return msgObj;
    };
  })(),
};
