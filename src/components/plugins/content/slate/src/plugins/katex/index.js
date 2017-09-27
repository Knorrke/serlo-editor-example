import KatexIcon from 'material-ui/svg-icons/editor/functions'
import React from 'react'

import { ToolbarButton } from 'ory-editor-plugins-slate/lib/helpers'
import Plugin from 'ory-editor-plugins-slate/lib/plugins/Plugin'
import KatexBlock from './block'
import KatexInline from './inline'

export const KATEX_BLOCK = 'KATEX/BLOCK'
export const KATEX_INLINE = 'KATEX/INLINE'

export default class KatexPlugin extends Plugin {
    constructor(props) {
        super(props)

        this.DEFAULT_NODE = props.DEFAULT_NODE
    }

    Button = ({ editorState, onChange }) => {
        const onClick = (e) => {
            e.preventDefault()

            const hasBlock = editorState.blocks.some((block) => block.type === KATEX_BLOCK)
            const hasInline = editorState.inlines.some((inline) => inline.type === KATEX_INLINE)

            let newState

            if (hasBlock) {
                newState = editorState
                    .transform()
                    .deleteBackward()
                    .apply()
            } else if (hasInline) {
                newState = editorState
                    .transform()
                    .deleteBackward()
                    .apply()
            } else {
                const formula = window.prompt('Enter the src of the formula:')
                const inline = window.confirm('Press ok for inline, cancel for block formula')

                if (inline) {
                    newState = editorState
                        .transform()
                        .insertInline({
                            type: KATEX_INLINE,
                            data: { formula },
                            isVoid: true
                        })
                        .apply()
                } else {
                    newState = editorState
                        .transform()
                        .insertBlock({
                            type: KATEX_BLOCK,
                            data: { formula },
                            isVoid: true
                        })
                        .apply()
                }
            }

            onChange(newState)
        }

        const hasMath = editorState.blocks.some((block) => block.type === KATEX_BLOCK)
        const hasInline = editorState.inlines.some((inline) => inline.type === KATEX_INLINE)

        return <ToolbarButton onClick={onClick} isActive={hasMath || hasInline} icon={<KatexIcon />} />
    }

    name = 'katex'

    nodes = {
        [KATEX_BLOCK]: KatexBlock,
        [KATEX_INLINE]: KatexInline
    }

    toolbarButtons = [this.Button]

    deserialize = (el, next) => {
        console.log('deserializing', el);
        switch (el.tagName.toLowerCase()) {
            case 'katexblock':
                return {
                    kind: 'block',
                    type: KATEX_BLOCK,
                    isVoid: true,
                    data: {
                        formula: el.children[0].data
                    }
                }
            case 'katexinline':
                return {
                    kind: 'inline',
                    type: KATEX_INLINE,
                    isVoid: true,
                    data: {
                        formula: el.children[0].data
                    }
                }
        }
    }

    serialize = (object, children) => {
        console.log('serializing', object);
        if (object.kind !== 'block') {
            return
        }

        switch (object.type) {
            case KATEX_BLOCK:
                return <katexblock>{children}</katexblock>
            case KATEX_INLINE:
                return <katexinline>{children}</katexinline>
        }
    }
}
