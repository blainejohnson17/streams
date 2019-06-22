import React, { Fragment } from "react";
import flvjs from 'flv.js';
import { connect } from "react-redux";
import { getStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.player = null;
  }

  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !flvjs.isSupported() || !this.props.stream) {
      return;
    }

    this.player = flvjs.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    return(
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls={true} ></video>
        <div>StreamShow</div>
        {this.props.stream &&
          <Fragment>
            <h1>{this.props.stream.title}</h1>
            <h5>{this.props.stream.description}</h5>
          </Fragment>
        }
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  { getStream }
)(StreamShow)
