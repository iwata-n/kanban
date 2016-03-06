import React from 'react'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'
import RaisedButton from 'material-ui/lib/raised-button'

import {WidthProvider, Responsive}  from 'react-grid-layout'
import ReactGridLayout from 'react-grid-layout'

import Issues from './Issues'

const GridLayout = WidthProvider(ReactGridLayout)

const styles = {
  Kanban: {
    background: Colors.red50,
  },
  Button: {
    maring: 12,
  },
  Board: {
    width: "100%",
    height: "100%",
    top: 40,
    background: Colors.grey50,
    position: "fixed",
  }
}

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false

    this.state = {
      layout: {
        className: "layout",
        items: 50,
        cols: 12,
        rowHeight: 30,
        // This turns off compaction so you can place items wherever.
        verticalCompact: false
      },
      data: [],
      text: [],
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._isMounted = true
    this.loadLocalStorage()
  }

  loadLocalStorage() {
    if (!window.localStorage) {
      return
    }

    let data = JSON.parse(window.localStorage.getItem("data"))
    let text = JSON.parse(window.localStorage.getItem("text"))
    if (!data) {
      data = [{x: 0, y:0, w: 2, h: 2}]
    }
    if (!text || text.length <= 0) {
      text = ["No Item"]
    }
    this.setState({
      data: data,
      text: text,
    })
  }

  setLocalStorage(data, text) {
    window.localStorage.setItem("data", JSON.stringify(data))
    window.localStorage.setItem("text", JSON.stringify(text))
  }

  claerLocalStorage() {
    window.localStorage.clear()
    this.setState({
      data: [],
      text: [],
    })
  }

  handleError(err) {
    console.error(err)
  }

  genDom() {
    return this.state.data.map((d, key) => {
      return (
        <div key={key} _grid={{x: d.x, y: d.y, w: 1, h: 2}} style={styles.Kanban}>{this.state.text[key]}</div>
      )
    })
  }

  onClickAdd(e) {
    this.setState({
      data: this.state.data.concat({x: 0, y:0, w: 2, h: 2}),
      text: this.state.text.concat("hoge")
    })
    this.setLocalStorage()
  }

  onClickClear(e) {
    this.claerLocalStorage()
  }

  onLayoutChange(data) {
    if (this._isMounted) {
      this.setLocalStorage(data, this.state.text)
    }
  }

  onBreakpointChange(bp) {
  }

  render() {
    return (
      <div>
        <RaisedButton label="Add" style={styles.Button} onClick={this.onClickAdd.bind(this)}/>
        <RaisedButton label="Clear" style={styles.Button} onClick={this.onClickClear.bind(this)}/>

        <GridLayout className="layout"
                    verticalCompact={false}
                    onBreakpointChange={this.onBreakpointChange.bind(this)}
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    useCSSTransforms={true}
                    cols={12}
                    rowHeight={30}
                    style={styles.Board}>
            {this.genDom()}
        </GridLayout>
      </div>
    );
  }
}
