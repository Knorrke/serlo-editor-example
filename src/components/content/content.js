/**
 * Created by benny on 24.11.16.
 */
import contentSerlo from "./content.serlo.json"
import transform from "./converter/transform"
import split from "./converter/split"
import markdownToSlate from "./converter/markdownToSlate"

const cells = markdownToSlate(split(transform(contentSerlo)))
const content = {
  id: '1',
  ...cells
}

console.log(markdownToSlate(split(transform(contentSerlo))))

export default content
