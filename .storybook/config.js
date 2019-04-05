import { addDecorator, configure} from '@storybook/react';
import { withConsole } from '@storybook/addon-console';


function loadStories() {
  require('../stories/materialUI');
  require('../stories/reduxForm');
  require('../stories/antDesign');
  require('../stories/default');
}

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
configure(loadStories, module);
