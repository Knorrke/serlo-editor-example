import React from 'react'
import { BlockMath } from 'react-katex'

import 'katex/dist/katex.min.css'

const Block = ({ attributes, children, node }) => {
  const { data } = node
  const formula = data.get('formula')

  return (
    <div {...attributes} contentEditable={false}>
      <BlockMath math={formula} />
      {children}
    </div>
  )
}

export default Block
