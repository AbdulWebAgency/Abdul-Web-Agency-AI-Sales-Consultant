import React from 'react'

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  // Bold **text**
  const parts: React.ReactNode[] = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+?)`/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-b-${i}`}>{match[1]}</strong>)
    } else if (match[2] !== undefined) {
      parts.push(<em key={`${keyPrefix}-i-${i}`}>{match[2]}</em>)
    } else if (match[3] !== undefined) {
      parts.push(<code key={`${keyPrefix}-c-${i}`}>{match[3]}</code>)
    }
    lastIndex = regex.lastIndex
    i++
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

/**
 * Lightweight markdown renderer for emails. Supports headings (#..######),
 * bullet lists (-, *), bold (**), italic (*) and inline code (`).
 * Strips raw markdown syntax so it never renders as ### or ** in clients.
 */
export function RenderMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []
  let listItems: string[] = []
  let listKey = 0

  const flushList = () => {
    if (listItems.length === 0) return
    blocks.push(
      <ul key={`ul-${listKey++}`} style={{ margin: '8px 0', paddingLeft: '20px' }}>
        {listItems.map((item, idx) => (
          <li key={idx} style={{ margin: '4px 0', color: '#0b1220', fontSize: '14px', lineHeight: 1.6 }}>
            {renderInline(item, `li-${listKey}-${idx}`)}
          </li>
        ))}
      </ul>,
    )
    listItems = []
  }

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd()
    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(line)
    const bulletMatch = /^\s*[-*•]\s+(.*)$/.exec(line)

    if (headingMatch) {
      flushList()
      const level = headingMatch[1].length
      const content = headingMatch[2]
      const sizes = ['22px', '20px', '18px', '16px', '15px', '14px']
      blocks.push(
        <p
          key={`h-${idx}`}
          style={{
            color: '#0b1220',
            fontSize: sizes[level - 1],
            fontWeight: 700,
            margin: '14px 0 6px',
            lineHeight: 1.3,
          }}
        >
          {renderInline(content, `h-${idx}`)}
        </p>,
      )
    } else if (bulletMatch) {
      listItems.push(bulletMatch[1])
    } else if (line.trim() === '') {
      flushList()
      blocks.push(<div key={`sp-${idx}`} style={{ height: '8px' }} />)
    } else {
      flushList()
      blocks.push(
        <p
          key={`p-${idx}`}
          style={{ margin: '4px 0', color: '#0b1220', fontSize: '14px', lineHeight: 1.6 }}
        >
          {renderInline(line, `p-${idx}`)}
        </p>,
      )
    }
  })
  flushList()

  return <>{blocks}</>
}