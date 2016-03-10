import React from 'react'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import {WidthProvider, Responsive}  from 'react-grid-layout'
import ReactGridLayout from 'react-grid-layout'

const GridLayout = WidthProvider(ReactGridLayout)

const styles = {
  Kanban: {
    background: Colors.red50,
  },
  Button: {
    maring: 12,
  },
  Text: {
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 1,
  },
  Board: {
    width: "100%",
    height: "100%",
    top: 50,
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
      new_text: "",
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
    if (!data || !text) {
      this.claerLocalStorage()
    } else {
      this.setState({
        data: data,
        text: text,
      })
    }
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

  /** Addボタン */
  handleClcikAdd(e) {
    this.setState({open_new_dialog: true})
  }

  /** Clearボタン */
  handleClickClear(e) {
    this.claerLocalStorage()
  }

  handleTextChange(e) {
    this.setState({
      kanban_title: e.target.value
    })
  }

  /** GridLayoutの表示が変わった */
  onLayoutChange(data) {
    if (this._isMounted) {
      this.setLocalStorage(data, this.state.text)
    }
  }

  /** */
  onBreakpointChange(bp) {
  }

  /** Dialogの閉じるボタンを押した */
  handleDialogClose(e) {
    this.setState({open_new_dialog: false});
  }

  /** DialogのAddボタンを押した */
  handleAddKanban(e) {
    this.setState({
      data: this.state.data.concat({x: 0, y:0, w: 2, h: 2}),
      text: this.state.text.concat(this.state.kanban_title),
      open_new_dialog: false
    })
    this.setLocalStorage()
  }

  render() {
    const kanban = this.state.data.map((d, key) => {
      return (
        <Paper key={key} _grid={{x: d.x, y: d.y, w: 1, h: 2}} style={styles.Kanban}>{this.state.text[key]}</Paper>
      )
    })

    return (
      <div>
        <TextField className="title"
                   style={styles.Text}
                   value={this.state.kanban_title}
                   onChange={this.handleTextChange.bind(this)}
                   hintText="Title" />
        <RaisedButton label="Add"
                      style={styles.Button}
                      onClick={this.handleAddKanban.bind(this)}/>
        <RaisedButton label="Clear"
                      style={styles.Button}
                      onClick={this.handleClickClear.bind(this)}/>
        <GridLayout className="layout"
                    verticalCompact={false}
                    onBreakpointChange={this.onBreakpointChange.bind(this)}
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    useCSSTransforms={true}
                    cols={12}
                    rowHeight={30}
                    style={styles.Board}>
            {kanban}
        </GridLayout>
      </div>
    );
  }
}
