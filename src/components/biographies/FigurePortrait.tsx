import { useState } from 'react'
import type { Figure } from '../../data/types'
import { portraitsFor } from '../../data/portraits'

const licenseLabel: Record<string, string> = {
  pd: '公版',
  cc: 'CC 授權',
  ref: '版權歸原權利人',
}

function assetUrl(file: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${file.replace(/^\//, '')}`
}

function SealPortrait({ figure }: { figure: Figure }) {
  return (
    <div className="bio-seal" role="img" aria-label={`${figure.name}（無公版畫像，以印記示意）`}>
      <span className="bio-seal-frame" aria-hidden="true" />
      <span className="bio-seal-name" aria-hidden="true">
        {figure.name}
      </span>
      <span className="bio-seal-sub" aria-hidden="true">
        {figure.nickname ?? figure.role}
      </span>
    </div>
  )
}

interface FigurePortraitProps {
  figure: Figure
}

export function FigurePortrait({ figure }: FigurePortraitProps) {
  const versions = portraitsFor(figure.id)
  const [selection, setSelection] = useState({ figureId: figure.id, index: 0 })
  const [failedId, setFailedId] = useState<string | null>(null)

  // 人物變更時不使用 effect 重設：以 figureId 對照，讓狀態自動失效。
  const active = selection.figureId === figure.id ? selection.index : 0
  const current = versions[active]
  const failed = current ? failedId === current.id : false

  return (
    <figure className="bio-portrait">
      <div className="bio-portrait-frame">
        {current && !failed ? (
          <img
            className="bio-portrait-image"
            src={assetUrl(current.file)}
            alt={`${figure.name}${current.artist ? `・${current.artist}` : ''}`}
            loading="lazy"
            onError={() => {
              if (current) setFailedId(current.id)
            }}
          />
        ) : (
          <SealPortrait figure={figure} />
        )}
      </div>

      {current && !failed ? (
        <figcaption className="bio-portrait-credit">
          <span className={`bio-license bio-license-${current.license}`}>
            {licenseLabel[current.license] ?? current.license}
          </span>
          <span className="bio-credit-text">
            {current.label}
            {current.artist ? `・${current.artist}` : ''}
            {current.era ? `（${current.era}）` : ''}
          </span>
          {current.sourceUrl && (
            <a href={current.sourceUrl} target="_blank" rel="noreferrer">
              出處
            </a>
          )}
        </figcaption>
      ) : (
        <figcaption className="bio-portrait-credit is-muted">
          暫無公版畫像，以名號印記示意。
        </figcaption>
      )}

      {versions.length > 1 && (
        <div className="bio-portrait-versions" role="tablist" aria-label="畫像版本">
          {versions.map((version, index) => (
            <button
              key={version.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`bio-portrait-thumb${index === active ? ' is-active' : ''}`}
              onClick={() => setSelection({ figureId: figure.id, index })}
              title={`${version.label}${version.artist ? `・${version.artist}` : ''}`}
            >
              <span>{version.label}</span>
              {version.artist && <em>{version.artist}</em>}
            </button>
          ))}
        </div>
      )}
    </figure>
  )
}
