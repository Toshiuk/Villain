import React, { Component } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Wrapp from './components/wrapp'
import Uncompress from './components/uncompress'
import CanvasRender from './components/render'
import { ReaderContext, ReaderProvider } from './context'

// Css
import './css/styles.css'

const defaultOpts = {
  theme: 'dark',
  overlay: true,
  workerPath: null,
  allowFullScreen: true,
  autoHideControls: true,
}

class Villain extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    width: '640px',
    height: '320px',
    options: { ...defaultOpts },
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { file, width, height, options } = this.props
    const opts = { ...defaultOpts, ...options }

    return (
      <ReaderProvider>
        <Wrapp
          className={clsx(opts.autoHideControls && 'villain-autoHideControls')}
          width={width}
          height={height}
        >
          <Uncompress file={file} workerPath={opts.workerPath}>
            <ReaderContext.Consumer>
              {({ state }) => (
                <CanvasRender
                  id={'osd-canvas-render'}
                  bookMode={state.bookMode}
                  currentPage={state.currentPage}
                  allowFullScreen={opts.allowFullScreen}
                />
              )}
            </ReaderContext.Consumer>
          </Uncompress>
        </Wrapp>
      </ReaderProvider>
    )
  }
}

Villain.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  width: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.shape({
    theme: PropTypes.string,
    workerPath: PropTypes.string,
  }),
}

export default Villain
