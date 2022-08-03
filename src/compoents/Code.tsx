import { FC } from 'react'
import { Prism as SyntaxHighlighter, createElement } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// const codeString = `const element = <h1>Hello, world!</h1>`


type RenderOption = {
  paddingX: number,
  paddingY: number,
  lineHeight: number
}
const codeRenderer = ({ paddingX, paddingY, lineHeight }: RenderOption) => {
  return (props: rendererProps) => {
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
      return createElement({
        node: svgNode,
        stylesheet: props.stylesheet,
        useInlineStyles: props.useInlineStyles,
        key: `code-segment-${i}`
      })
    })}</>
  }
}

export const OgpCode: FC<{ codeString: string }> = ({ codeString }) => {
  const lineHeight = 20
  const paddingX = 20
  const paddingY = 20
  const width = 1200
  const height = 630
  const renderer = codeRenderer({ paddingX, paddingY, lineHeight })
  const lines = codeString.split("\n").length
  const fontSize = 12
  const maxLength = Math.max(...codeString.split("\n").map(line => line.length))
  const stringAspect = lines / maxLength
  const codeSize = {
    width:maxLength * fontSize,
    height:width * stringAspect
  }
  console.log(stringAspect, lines, maxLength)
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width} height={height}
    // viewBox={`0 0 ${codeSize.width} ${codeSize.height}`}
  >
    <SyntaxHighlighter language="tsx" style={darcula}
      PreTag={(args) => {
        const fill =  args.style.background
        return <g
          // fill={fill}
        >

          <rect fill={"black"} width={width} height={height} />
          {/* <rect fill={"#220000"} {...codeSize} /> */}
          <g
            preserveAspectRatio='xMaxYMax'
            // width={width} height={height}
            {...codeSize}
            viewBox={`0 0 ${codeSize.width} ${codeSize.height}`}>
            <rect fill={fill} {...codeSize}
            // width={width} height={height} 
            />
            {args.children}
          </g>
        </g>
      }}
      CodeTag={(args) => {
        return <text width={"100%"} {...args} />
      }}
      renderer={(props) => {
        const components = renderer(props)
        console.log(components)

        return components
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  </svg>


}
export default OgpCode