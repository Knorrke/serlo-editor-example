import React from 'react'
import { InlineMath } from 'react-katex'

const Inline = ({ attributes, children, node }) => {
  const { data } = node
  const formula = data.get('formula')

  return (
    <span {...attributes}>
      <InlineMath math={formula} />
      {children}
    </span>
  )
}

export default Inline
