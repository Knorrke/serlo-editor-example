import React from 'react'
import parse5 from 'parse5'

// FIXME #126
import { defaultPlugins as defaultSlatePlugins } from 'ory-editor-plugins-slate/lib/hooks'
import { Html, Raw } from 'slate'
import KatexPlugin from './plugins/katex'
import {P} from 'ory-editor-plugins-slate/lib/plugins/paragraph'
const DEFAULT_NODE = P

const defaultPlugins = [...defaultSlatePlugins, new KatexPlugin({ DEFAULT_NODE })]

const lineBreakSerializer = {
    deserialize(el) {
        if (el.tagName.toLowerCase() === 'br') {
            return { kind: 'text', text: '\n' }
        }
    },
    serialize(object, children) {
        if (object.type === 'text' || children === '\n') {
            return <br />
        }
    }
}

const html = new Html({
    rules: [...defaultPlugins, lineBreakSerializer],
    parseHtml: parse5.parseFragment
})

const options = { terse: true }

const createInitialState = () => ({
    editorState: Raw.deserialize(
        {
            nodes: [
                {
                    kind: 'block',
                    type: P,
                    nodes: [
                        {
                            kind: 'text',
                            text: ''
                        }
                    ]
                }
            ]
        },
        options
    )
})

export const unserialize = ({
    importFromHtml,
    serialized,
    editorState
}) => {
    if (serialized) {
        return { editorState: Raw.deserialize(serialized, options) }
    } else if (importFromHtml) {
        return { editorState: html.deserialize(importFromHtml, options) }
    } else if (editorState) {
        return { editorState }
    }

    return createInitialState()
}

export const serialize = ({ editorState }) => ({
    serialized: Raw.serialize(editorState, options)
})
