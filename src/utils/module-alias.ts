import * as path from 'path';
import * as moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  'Src': path.join(files, 'src'),
  'Test': path.join(files, 'test'),
});
