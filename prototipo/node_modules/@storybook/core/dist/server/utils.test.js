"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mockFs = _interopRequireDefault(require("mock-fs"));

var _utils = require("./utils");

const HEAD_HTML_CONTENTS = '<script>console.log("custom script!");</script>';
const BASE_HTML_CONTENTS = '<script>console.log("base script!");</script>';
describe('server.getPreviewHeadHtml', () => {
  describe('when .storybook/preview-head.html does not exist', () => {
    beforeEach(() => {
      (0, _mockFs.default)({
        [`${__dirname}/templates/base-preview-head.html`]: BASE_HTML_CONTENTS,
        config: {}
      });
    });
    afterEach(() => {
      _mockFs.default.restore();
    });
    it('return an empty string', () => {
      const result = (0, _utils.getPreviewHeadHtml)('./config');
      expect(result).toEqual(BASE_HTML_CONTENTS);
    });
  });
  describe('when .storybook/preview-head.html exists', () => {
    beforeEach(() => {
      (0, _mockFs.default)({
        [`${__dirname}/templates/base-preview-head.html`]: BASE_HTML_CONTENTS,
        config: {
          'preview-head.html': HEAD_HTML_CONTENTS
        }
      });
    });
    afterEach(() => {
      _mockFs.default.restore();
    });
    it('return the contents of the file', () => {
      const result = (0, _utils.getPreviewHeadHtml)('./config');
      expect(result).toEqual(BASE_HTML_CONTENTS + HEAD_HTML_CONTENTS);
    });
  });
});