import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/materialUI');
  require('../stories/reduxForm');
}

configure(loadStories, module);
