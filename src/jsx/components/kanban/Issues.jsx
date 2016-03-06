import React from 'react'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'

import Grid from 'react-grid-layout'

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    return (
      <div>
        <Paper style={this.props.style}>
          {this.props.title}
        </Paper>
      </div>
    );
  }
}
