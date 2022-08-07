'use strict';

var react = require('react');

var useDocumentVisibility = function useDocumentVisibility() {
  var _useState = react.useState(typeof document !== 'undefined' ? !document.hidden : true),
      visible = _useState[0],
      setVisible = _useState[1];

  var _useState2 = react.useState(0),
      count = _useState2[0],
      setCount = _useState2[1];

  var subsribers = react.useRef([]);

  var onVisibilityChange = function onVisibilityChange(callback) {
    subsribers.current.push(callback);
  };

  react.useEffect(function () {
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

exports.useDocumentVisibility = useDocumentVisibility;
//# sourceMappingURL=index.js.map
