import React from 'react'

import {H1, H2, H3, H4, H5, H6} from 'ory-editor-plugins-slate/lib/plugins/headings'
import {P} from 'ory-editor-plugins-slate/lib/plugins/paragraph'
import {A} from 'ory-editor-plugins-slate/lib/plugins/link'
import {OL, UL, LI} from 'ory-editor-plugins-slate/lib/plugins/lists'
import {STRONG, EM} from 'ory-editor-plugins-slate/lib/plugins/emphasize'
import {CODE} from 'ory-editor-plugins-slate/lib/plugins/code'
import {BLOCKQUOTE} from 'ory-editor-plugins-slate/lib/plugins/blockquote'
import {KATEX_BLOCK, KATEX_INLINE} from './plugins/katex'
import {Html, Raw} from 'slate'

const rules = [/*{
    deserialize: (el) => {
        console.log(el)
        return null
    }
}, */{
    deserialize: (el, next) => el.tagName === 'p' ? {
            kind: 'block',
            type: P,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h1' ? {
            kind: 'block',
            type: H1,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h2' ? {
            kind: 'block',
            type: H2,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h3' ? {
            kind: 'block',
            type: H3,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h4' ? {
            kind: 'block',
            type: H4,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h5' ? {
            kind: 'block',
            type: H5,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'h6' ? {
            kind: 'block',
            type: H6,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'a' ? {
            kind: 'inline',
            type: A,
            data: {href: el.attribs.href},
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'ul' ? {
            kind: 'block',
            type: UL,
            nodes: next(el.children.filter((child) => child.tagName === 'li'))
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'ol' ? {
            kind: 'block',
            type: OL,
            nodes: next(el.children.filter((child) => child.tagName === 'li'))
        } : null
}, {
    deserialize: (el, next) => {
        if (el.tagName !== 'li' || el.children.length === 0) {
            return null
        }
        const children = next(el.children).map(child => child.kind === 'block' ? child : {
                kind: 'block',
                type: P,
                nodes: [child]
            })
        return {
            kind: 'block',
            type: LI,
            nodes: children
        }
    }
}, {
    deserialize: (el, next) => el.tagName === 'strong' ? {
            kind: 'mark',
            type: STRONG,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'em' ? {
            kind: 'mark',
            type: EM,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'code' ? {
            kind: 'mark',
            type: CODE,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'blockquote' ? {
            kind: 'block',
            type: BLOCKQUOTE,
            nodes: next(el.children)
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'katexblock' ? {
            kind: 'block',
            type: KATEX_BLOCK,
            isVoid: true,
            data: {
                formula: el.children[0].data
            }
        } : null
}, {
    deserialize: (el, next) => el.tagName === 'katexinline' ? {
            kind: 'inline',
            type: KATEX_INLINE,
            isVoid: true,
            data: {
                formula: el.children[0].data
            }
        } : null
}, {
    serialize: (el, children) => el.type === H1
        ? <h1>{children}</h1>
        : null
}, {
    serialize: (el, children) => el.type === P
        ? <p>{children}</p>
        : null
}]

export const html = new Html({rules})

const options = {terse: true}

export default ({importFromHtml, serialized, editorState}) => {
    if (serialized) {
        return {editorState: Raw.deserialize(serialized, options)}
    } else if (importFromHtml) {
        return {editorState: html.deserialize(importFromHtml, options)}
    } else if (editorState) {
        return {editorState}
    }

    return this.createInitialState()
}