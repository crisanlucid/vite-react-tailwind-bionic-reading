import flexbugsFixes from "postcss-flexbugs-fixes";
import postcssImport from "postcss-import";
import postcssExtend from "postcss-extend";
import postcssMixins from "postcss-mixins";
import postcssPresetEnv from "postcss-preset-env";
import postcssReporter from "postcss-reporter";

export default {
  plugins: [
    flexbugsFixes,
    postcssImport,
    postcssExtend,
    postcssMixins,
    postcssPresetEnv({
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": false,
      },
    }),
    postcssReporter,
  ],
};
