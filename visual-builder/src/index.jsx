// External library dependencies.
import React from 'react';

// WordPress package dependencies.
const {
  addAction,
} = window?.vendor?.wp?.hooks;

// Divi package dependencies.
const {
  // Renderer - HTML
  ModuleContainer,

  // Renderer - Styles
  StyleContainer,

  // Renderer - Classnames
  elementClassnames,
} = window?.divi?.module;
const {
  registerModule
} = window?.divi?.moduleLibrary;

// Module metadata that is used in both Frontend and Visual Builder.
import metadata from './module.json';

/**
 * React function component for rendering module style.
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag
}) => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Element: Module */}
    {elements.style({
      attrName: 'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility
        }
      }
    })}

    {/* Element: Title */}
    {elements.style({
      attrName: 'title',
    })}

    {/* Element: Content */}
    {elements.style({
      attrName: 'content',
    })}
  </StyleContainer>
);

/**
 * React function component for registering module script data.
 */
const ModuleScriptData = ({
  elements,
}) => (
  <React.Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </React.Fragment>
);

/**
 * Function for registering module classnames.
 */
const moduleClassnames = ({
  classnamesInstance,
  attrs,
}) => {
  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
    }),
  );
}

/**
 * Simple Quick Module.
 */
const simpleQuickModule = {
  // Metadata that is used on Visual Builder and Frontend
  metadata,

  // Layout renderer components.
  renderers: {
    // React Function Component for rendering module's output on layout area.
    edit: ({
      attrs,
      id,
      name,
      elements,
    }) => (
      <ModuleContainer
        attrs={attrs}
        elements={elements}
        id={id}
        moduleClassName="d5_tut_simple_quick_module"
        name={name}
        scriptDataComponent={ModuleScriptData}
        stylesComponent={ModuleStyles}
        classnamesFunction={moduleClassnames}
      >
        {elements.styleComponents({
          attrName: 'module',
        })}
        <div className="et_pb_module_inner">
          {elements.render({
            attrName: 'title',
          })}
          {elements.render({
            attrName: 'content',
          })}
        </div>
      </ModuleContainer>
    ),
  },

  // Attribute that is automatically added into the module when the module is inserted
  // into the layout so that the newly inserted module has some placeholder content
  placeholderContent: {
    module: {
      decoration: {
        background: {
          desktop: {
            value: {
              color: '#DFDFDF',
            }
          }
        },
      }
    },
    title: {
      innerContent: {
        desktop: {
          value: 'Module Title'
        }
      }
    },
    content: {
      innerContent: {
        desktop: {
          value: 'Module Content'
        }
      }
    }
  },
};

// Register module.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'd5Tut.simpleQuickModule', () => {
  registerModule(simpleQuickModule.metadata, simpleQuickModule);
});