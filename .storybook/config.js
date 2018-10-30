import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

function loadStories() {
  require('../stories');
  require('../stories/materialUI');
  require('../stories/reduxForm');
  require('../stories/antDesign');
}

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
configure(loadStories, module);
