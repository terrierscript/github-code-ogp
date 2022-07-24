import { Prism as SyntaxHighlighter, createElement } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// const codeString = `const element = <h1>Hello, world!</h1>`
const codeString = `
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
`

export const CodeSample = () => {
  const lineHeight = 20
  const paddingX = 20
  const paddingY = 20
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="500" height="500" viewBox="0 0 500 500"
  >
    <SyntaxHighlighter language="tsx" style={darcula}
      PreTag={(args) => {
        const fill = args.style.background
        return <g x={paddingX} y={paddingY}
          fill={fill}
        >
          <rect fill={fill} width="500" height="500" />
          <>
            {args.children}
          </>
        </g>
      }}
      CodeTag={(args) => {
        return <text x={paddingX} y={paddingY}
          {...args}
        />
      }}
      renderer={(props) => {
        return <>{props.rows.map((row, i) => {
          const children: rendererNode[] = (row.children ?? []).map(nodeChildren => {
            const defaultColor = props.stylesheet[`code[class*="language-"]`].color
            const fillColor = nodeChildren.properties?.className
              .map(cls => {
                const style = props.stylesheet[cls]
                return style?.color
              }).filter(color => !!color)?.[0] ?? defaultColor
            return {
              ...nodeChildren,
              tagName: "tspan",
              properties: {
                className: nodeChildren.properties?.className ?? [],
                fill: fillColor
              },
            }
          })
          // const isBreak = node.children?.map(c => c.children?.map(c => c.value)).join("\n")
          // console.log({ isBreak })
          const svgNode: rendererNode = {
            ...row,
            children,
            tagName: "tspan",
            properties: {
              className: row.properties?.className ?? [],
              x: paddingX,
              y: lineHeight * i + paddingY,
            }
          }
          const elm = createElement({
            node: svgNode,
            stylesheet: props.stylesheet,
            useInlineStyles: props.useInlineStyles,
            key: `code-segment-${i}`
          })
          return <>{elm}</>
        })}</>
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  </svg>


}
export default CodeSample