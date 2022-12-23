const Handlebars = require('handlebars');

module.exports = function (plop) {
  plop.setHelper('titleCaseWithoutSpace', function (text) {
    // Remove spaces in case text is hyphenated
    const template = Handlebars.compile('{{titleCase text}}');
    const titleCased = template({ text });
    return titleCased.split(/\s/).join('');
  });

  plop.setGenerator('app', {
    description: 'Adds a new app to MyOrg core',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'app package name',
        default: 'app-name',
        validate: name => {
          if (/\s/g.test(name)) {
            throw new Error("Name can't have spaces");
          }
          return true;
        },
        transformer: name => name.toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'app description',
        default: 'MyOrg Application'
      },
      {
        type: 'input',
        name: 'maintainer',
        message: 'maintainer email',
        default: 'Aaron Agarunov'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'apps/{{name}}',
        base: 'tools/generators/app',
        templateFiles: 'tools/generators/app'
      },
      {
        type: 'modify',
        path: 'apps/core/package.json',
        pattern: /"dependencies":\s*{/,
        template: '"dependencies": {\n    "@myorg/{{name}}": "workspace:*",'
      },
      {
        type: 'modify',
        path: 'apps/core/src/App.js',
        pattern:
          /const CoreApp = React.lazy\(\(\) => import\('\.\/routes'\)\);/,
        template: `const CoreApp = React.lazy(() => import('./routes'));
const {{titleCaseWithoutSpace name}}App = React.lazy(() => import('@myorg/{{name}}'));`
      },
      {
        type: 'modify',
        path: 'apps/core/src/App.js',
        pattern: /\{\/\* Applications \*\/\}/,
        template: `{/* Applications */}
        <Route path="/{{name}}">
          <DefaultFallback>
            <{{titleCaseWithoutSpace name}}App />
          </DefaultFallback>
        </Route>
`
      },
      {
        type: 'modify',
        path: 'packages/shared/src/constants/apps.js',
        pattern: /\/\/ add default apps/,
        template: `,{ href: '/{{name}}', icon: HelpIcon, description: '{{description}}', color: '#ffffff', contactEmail: 'hi@agarun.com' }
      // add default apps`
      },
      function runPnpmInstall() {
        const { spawn } = require('child_process');
        const pnpmInstall = spawn('pnpm', ['install']);
        pnpmInstall.stdout.pipe(process.stdout);
        pnpmInstall.stderr.pipe(process.stderr);
      }
    ]
  });

  plop.setGenerator('app-ts', {
    description: 'Adds a new app to MyOrg core',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'app package name',
        default: 'app-name',
        validate: name => {
          if (/\s/g.test(name)) {
            throw new Error("Name can't have spaces");
          }
          return true;
        },
        transformer: name => name.toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'app description',
        default: 'MyOrg Application'
      },
      {
        type: 'input',
        name: 'maintainer',
        message: 'maintainer email',
        default: 'Aaron Agarunov'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'apps/{{name}}',
        base: 'tools/generators/app-ts',
        templateFiles: 'tools/generators/app-ts'
      },
      {
        type: 'modify',
        path: 'apps/core/package.json',
        pattern: /"dependencies":\s*{/,
        template: '"dependencies": {\n    "@myorg/{{name}}": "workspace:*",'
      },
      {
        type: 'modify',
        path: 'apps/core/src/App.js',
        pattern:
          /const CoreApp = React.lazy\(\(\) => import\('\.\/routes'\)\);/,
        template: `const CoreApp = React.lazy(() => import('./routes'));
const {{titleCaseWithoutSpace name}}App = React.lazy(() => import('@myorg/{{name}}'));`
      },
      {
        type: 'modify',
        path: 'apps/core/src/App.js',
        pattern: /\{\/\* Applications \*\/\}/,
        template: `{/* Applications */}
        <Route path="/{{name}}">
          <DefaultFallback>
            <{{titleCaseWithoutSpace name}}App />
          </DefaultFallback>
        </Route>
`
      },
      {
        type: 'modify',
        path: 'packages/shared/src/constants/apps.js',
        pattern: /\/\/ add default apps/,
        template: `,{ href: '/{{name}}', icon: HelpIcon, description: '{{description}}', color: '#ffffff', contactEmail: 'hi@agarun.com' }
      // add default apps`
      },
      function runPnpmInstall() {
        const { spawn } = require('child_process');
        const pnpmInstall = spawn('pnpm', ['install']);
        pnpmInstall.stdout.pipe(process.stdout);
        pnpmInstall.stderr.pipe(process.stderr);
      }
    ]
  });

  plop.setGenerator('library', {
    description: 'Adds a new library to MyOrg core',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'library package name',
        default: 'library-name',
        validate: name => {
          if (/\s/g.test(name)) {
            throw new Error("Name can't have spaces");
          }
          return true;
        },
        transformer: name => name.toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'library description',
        default: 'MyOrg Application'
      },
      {
        type: 'input',
        name: 'maintainer',
        message: 'maintainer email',
        default: 'Aaron Agarunov'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'tools/generators/library',
        templateFiles: 'tools/generators/library'
      }
    ]
  });

  plop.setGenerator('library-ts', {
    description: 'Adds a new library to MyOrg core',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'library package name',
        default: 'library-name',
        validate: name => {
          if (/\s/g.test(name)) {
            throw new Error("Name can't have spaces");
          }
          return true;
        },
        transformer: name => name.toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'library description',
        default: 'MyOrg Application'
      },
      {
        type: 'input',
        name: 'maintainer',
        message: 'maintainer email',
        default: 'Aaron Agarunov'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'tools/generators/library-ts',
        templateFiles: 'tools/generators/library-ts'
      }
    ]
  });
};
