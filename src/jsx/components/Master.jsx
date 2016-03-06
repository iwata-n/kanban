import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/lib/app-bar'
import {Spacing} from 'material-ui/lib/styles'
import Colors from 'material-ui/lib/styles/colors'

import ThemeManager from 'material-ui/lib/styles/theme-manager'
import MyTheme from './Theme'

const styles = {
  appbar: {
    marginTop: 0,
    //marginBottom: 64,
    position: 'fixed'
  },
  content: {
    width: '100%',
    height: '100%',
    background: Colors.gray50,
    top: 0,
    position: 'fixed',
  }
}

const Master = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    }
  },

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Master
