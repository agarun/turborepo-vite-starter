module.exports = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.story.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/react-vite'
  },
  docs: {
    docsPage: 'automatic'
  }
};
