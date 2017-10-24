import React from 'react'
import MathComponent from './mathComponent'

import Form from './Form'
import 'katex/dist/katex.min.css'

const Block = (props) => {
  const { attributes, children, node } = props
  const { data } = node
  const formula = data.get('formula')

  return (
    <div {...attributes} contentEditable={false}>
      <MathComponent formula={formula}/>
      <Form formula={formula} {...props} />
      {children}
    </div>
  )
}

export default Block
