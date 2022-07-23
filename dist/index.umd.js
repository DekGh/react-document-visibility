(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = global || self, factory(global.reactDocumentVisibility = {}, global.React));
})(this, (function (exports, react) { 'use strict';

    var useDocumentVisibility = function useDocumentVisibility() {
      var _useState = react.useState(!document.hidden),
          visible = _useState[0],
          setVisible = _useState[1];

      var _useState2 = react.useState(0),
          count = _useState2[0],
          setCount = _useState2[1];

      var subsribers = react.useRef([]);

      var visiblePage = function visiblePage() {
        if (document.hidden) {
          subsribers.current.forEach(function (func) {
            return func('hidden');
          });
          setCount(function (prevCount) {
            return prevCount + 1;
          });
        } else {
          subsribers.current.forEach(function (func) {
            return func('visible');
          });
        }

        setVisible(document.visibilityState === "visible");
      };

      var onVisibilityChange = function onVisibilityChange(callback) {
        subsribers.current.push(callback);
      };

      react.useEffect(function () {
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

}));
//# sourceMappingURL=index.umd.js.map
