/**
 * Created by benny on 24.11.16.
 */
import unexpected from "unexpected";
import markdownToSlate from "../content/converter/markdownToSlate";

const expect = unexpected.clone()

const cases = [
  {
    description: 'Transform multiple cells to slate',
    input: {
      cells: [{
        rows: [{
          cells: [{
            size: 12,
            rows: [{
              cells: [{
                layout: {
                  plugin: {
                    name: 'ory/editor/core/layout/spoiler'
                  },
                  state: {
                    title: 'title'
                  }
                },
                rows: [{
                  cells: [{
                    markdown: '# header'
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {
                        name: 'serlo/content/image'
                      },
                      state: {
                        alt: 'image',
                        src: 'url'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    markdown: '**bold text**'
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    },
    output: {
      cells: [{
        rows: [{
          cells: [{
            size: 12,
            rows: [{
              cells: [{
                layout: {
                  plugin: {
                    name: 'ory/editor/core/layout/spoiler'
                  },
                  state: {
                    title: 'title'
                  }
                },
                rows: [{
                  cells: [{
                    content: {
                      plugin: {name: 'ory/editor/core/content/slate'},
                      state: {
                        importFromHtml: '<h1 id="header">header</h1>'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {
                        name: 'serlo/content/image'
                      },
                      state: {
                        alt: 'image',
                        src: 'url'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {name: 'ory/editor/core/content/slate'},
                      state: {
                        importFromHtml: '<p><strong>bold text</strong></p>'
                      }
                    }
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(markdownToSlate(testcase.input), 'to equal', testcase.output)
    })
  })
})
