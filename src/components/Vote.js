import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair() {
    return this.props.pair || [];
  },
  isDisabled() {
    return !!this.props.hasVoted;
  },
  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  },
  hasVotedAgainst(entry) {
    return this.props.hasVoted && !this.hasVotedFor(entry);
  },
  getClassname(entry) {
    const entryClass = entry.toLowerCase().replace(/\s/g, '-', 'g');
    let votedClass = '';

    if(this.hasVotedFor(entry)) {
      votedClass = 'voted-for';
    }
    else if(this.hasVotedAgainst(entry)) {
      votedClass = 'voted-against';
    }

    return `${entryClass} ${votedClass}`;
  },
  render() {
    return <div className="voting mdl-grid">
      {this.getPair().map(entry =>
        <button   className={`mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col background-image ${this.getClassname(entry)}`}
                  key={entry}
                  disabled={this.isDisabled()}
                  onClick={() => this.props.vote(entry)}>
            <div className="background-image__text">
              <h2>{entry}</h2>
            </div>
            {this.hasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null}
          </button>
        )}
    </div>
  }
});
