import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const { onCharSelected } = props;

  const elements = charList.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <View key={id} id={id} onCharSelected={onCharSelected} {...itemProps} />
    );
  });

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  let charListClass = "char__grid";

  if (spinner) {
    charListClass += " char__grid_center";
  }

  return (
    <div>
      <ul className={charListClass}>
        {errorMessage}
        {spinner}
        {elements}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

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
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
