import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/materialUI');
}

configure(loadStories, module);
