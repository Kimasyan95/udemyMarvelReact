import React, { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading() {
    this.setState({
      newItemLoading: true,
    });
  }

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  componentDidMount() {
    this.onRequest();
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const { onCharSelected } = this.props;

    const elements = charList.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <View key={id} id={id} onCharSelected={onCharSelected} {...itemProps} />
      );
    });

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? elements : null;

    let charListClass = "char__grid";

    if (loading) {
      charListClass += " char__grid_center";
    }

    return (
      <div>
        <ul className={charListClass}>
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ name, thumbnail, onCharSelected, id }) => {
  const imgStyleContain = thumbnail.includes("not_available")
    ? { objectFit: "contain" }
    : null;
  return (
    <li className="char__item" onClick={() => onCharSelected(id)}>
      <img src={thumbnail} alt="abyss" style={imgStyleContain} />
      <div className="char__name">{name}</div>
    </li>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;