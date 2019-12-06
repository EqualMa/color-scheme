const IS_GITPOD = !!process.env.GITPOD_HOST;

module.exports = {
  devServer: {
    disableHostCheck: IS_GITPOD,
  },
};
