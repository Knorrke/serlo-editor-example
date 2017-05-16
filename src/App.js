import './App.css'
import React, { Component } from 'react'

// The editor core
import Editor, { Editable } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'
require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Load some exemplary plugins:
import slateFactory, { defaultPlugins as defaultSlatePlugins } from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin
import KatexPlugin from './components/plugins/content/slate/src/plugins/katex'
import {P} from 'ory-editor-plugins-slate/lib/plugins/paragraph'
import slateUnserialize from './components/plugins/content/slate/src/slateUnserialize'

import parallax from 'ory-editor-plugins-parallax-background' // A plugin for parallax background images
import 'ory-editor-plugins-parallax-background/lib/index.css' // Stylesheets for parallax background images
import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'
import divider from 'ory-editor-plugins-divider'
import 'ory-editor-plugins-divider/lib/index.css'
import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'
import injection from './components/plugins/content/injection'
import geogebra from './components/plugins/content/geogebra'
import spoiler from './components/plugins/layout/spoiler'
import content from './components/content/content'

const slate = slateFactory([...defaultSlatePlugins, new KatexPlugin({P})])
slate.unserialize = slateUnserialize;

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
    content: [slate,
        spacer,
        image,
        video,
        divider,
        injection,
        geogebra], // Define plugins for content cells
    layout: [parallax({ defaultPlugin: slate }), spoiler] // Define plugins for layout cells
}


// Instantiate the editor
const editor = new Editor({
    plugins,
    // pass the content state - you can add multiple editables here
    editables: [content],
})

class App extends Component {
    render() {
        return (
            <div>
                <Editable
                    editor={editor}
                    id={content.id}
                    onChange={console.log}
                />

                <div>
                    <Trash editor={editor}/>
                    <DisplayModeToggle editor={editor}/>
                    <Toolbar editor={editor}/>
                </div>
            </div>
        );
    }
}

export default App;