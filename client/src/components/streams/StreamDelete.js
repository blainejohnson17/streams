import React, { Fragment } from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { getStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";
import history from '../../history';

class StreamDelete extends React.Component{
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const actions = (
      <Fragment>
        <button
          onClick={() => {this.props.deleteStream(this.props.stream.id)}}
          className="ui button negative"
        >Delete</button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );

    return (
      <Modal
        title="Delete Stream"
        content={`Are you sure you want to delete ${this.props.stream.title}?`}
        actions={actions}
        onDismiss={() => history.push('/')}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { getStream, deleteStream }
)(StreamDelete);
