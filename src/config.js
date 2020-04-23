export default {
    api: process.env.REACT_APP_API || 'http://localhost:8000/graphql',
    stage: process.env.REACT_APP_STAGE || 'development',
    query: {
      limit: 20,
    },
    timezone: {
      default: 'Australia/NSW',
    },
  };
  