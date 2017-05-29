/* eslint-env jest */
import unexpected from "unexpected";
import split from "../content/converter/split";

const expect = unexpected.clone()

const cases = [
    {
        description: 'Simple Layout no split',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem ipsum'}]
                }, {
                    cells: [{size: 12, raw: 'dolor adipiscing amet'}]
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
                                markdown: 'Lorem ipsum'
                            }]
                        }]
                    }]
                }, {
                    cells: [{
                        size: 12,
                        rows: [{
                            cells: [{
                                markdown: 'dolor adipiscing amet'
                            }]
                        }]
                    }]
                }]
            }]
        }
    }, {
        description: 'Layout with block element',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem \n![image](url)\n ipsum'}]
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
                                markdown: 'Lorem'
                            }]
                        }, {
                            cells: [{
                                content: {
                                    plugin: {
                                        name: 'ory/editor/core/content/image'
                                    },
                                    state: {
                                        alt: 'image',
                                        src: 'url'
                                    }
                                }
                            }]
                        }, {
                            cells: [{
                                markdown: 'ipsum'
                            }]
                        }]
                    }]
                }]
            }]
        }
    }, {
        description: 'Layout with injection',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem \n>[alttext](url)\n ipsum'}]
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
                                markdown: 'Lorem'
                            }]
                        }, {
                            cells: [{
                                content: {
                                    plugin: {
                                        name: 'serlo/content/injection'
                                    },
                                    state: {
                                        alt: 'alttext',
                                        src: 'url'
                                    }
                                }
                            }]
                        }, {
                            cells: [{
                                markdown: 'ipsum'
                            }]
                        }]
                    }]
                }]
            }]
        }
    }, {
        description: 'Layout with spoiler',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum'}]
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
                                markdown: 'Lorem'
                            }]
                        }, {
                            cells: [{
                                layout: {
                                    plugin: {
                                        name: 'serlo/layout/spoiler'
                                    },
                                    state: {
                                        title: 'title'
                                    }
                                }, rows: [{
                                    cells: [{
                                        markdown: 'markdowntext'
                                    }]
                                }]
                            }]
                        }, {
                            cells: [{
                                markdown: 'ipsum'
                            }]
                        }]
                    }]
                }]
            }]
        }
    }, {
        description: 'Layout with image in spoiler',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: '/// title\nmarkdowntext with image ![image](url)\n///'}]
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
                                        name: 'serlo/layout/spoiler'
                                    },
                                    state: {
                                        title: 'title'
                                    }
                                }, rows: [{
                                    cells: [{
                                        markdown: 'markdowntext with image'
                                    }]
                                }, {
                                    cells: [{
                                        content: {
                                            plugin: {
                                                name: 'ory/editor/core/content/image'
                                            },
                                            state: {
                                                alt: 'image',
                                                src: 'url'
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
    }, {
        description: 'Layout with geogebra injection',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem \n>[alttext](ggt/url)\n ipsum'}]
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
                                markdown: 'Lorem'
                            }]
                        }, {
                            cells: [{
                                content: {
                                    plugin: {
                                        name: 'serlo/content/geogebra'
                                    },
                                    state: {
                                        alt: 'alttext',
                                        src: 'url'
                                    }
                                }
                            }]
                        }, {
                            cells: [{
                                markdown: 'ipsum'
                            }]
                        }]
                    }]
                }]
            }]
        }
    }, {
        description: 'Layout with linked block element',
        input: {
            cells: [{
                rows: [{
                    cells: [{size: 12, raw: 'Lorem \n[![image](imageurl)](linkurl)\n ipsum'}]
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
                                markdown: 'Lorem'
                            }]
                        }, {
                            cells: [{
                                content: {
                                    plugin: {
                                        name: 'ory/editor/core/content/image'
                                    },
                                    state: {
                                        alt: 'image',
                                        src: 'imageurl',
                                        href: 'linkurl'
                                    }
                                }
                            }]
                        }, {
                            cells: [{
                                markdown: 'ipsum'
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
            expect(split(testcase.input), 'to equal', testcase.output)
        })
    })
})

