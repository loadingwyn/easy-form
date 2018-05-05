import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/materialUI');
  require('../stories/reduxForm');
  require('../stories/antDesign');
}

configure(loadStories, module);
