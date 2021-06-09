module.exports = async ({ config }) => {
    config.resolve.alias = {
      'react-native$': 'react-native-web'
    };
  
    return config;
  };