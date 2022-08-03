import { useState, useRef, useEffect } from 'react';

var useDocumentVisibility = function useDocumentVisibility() {
  var _useState = useState(typeof document !== 'undefined' && !document.hidden),
      visible = _useState[0],
      setVisible = _useState[1];

  var _useState2 = useState(0),
      count = _useState2[0],
      setCount = _useState2[1];

  var subsribers = useRef([]);

  var visiblePage = function visiblePage() {
    if (document.hidden) {
      setCount(function (prevCount) {
        return prevCount + 1;
      });
    }

    subsribers.current.forEach(function (func) {
      return func(!document.hidden);
    });
    setVisible(document.visibilityState === "visible");
  };

  var onVisibilityChange = function onVisibilityChange(callback) {
    subsribers.current.push(callback);
  };

  useEffect(function () {
    document.addEventListener('visibilitychange', visiblePage);
    return function () {
      document.removeEventListener('visibilitychange', visiblePage);
    };
  }, []);
  return {
    onVisibilityChange: onVisibilityChange,
    visible: visible,
    count: count
  };
};

export { useDocumentVisibility };
//# sourceMappingURL=index.modern.mjs.map
