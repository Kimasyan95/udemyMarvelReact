import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../services/MarvelService";

import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState({});

  useEffect(() => {
    updateChar();
  }, []);

  const { loading, error, getCharacter } = useMarvelService(); // создали новый экземпляр класса

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // Рандомное число в промежутке. По сути от 1011000 до 1011400 - это 400 id. Получаем рандомное число, умножаем на длину промежутка (разница максимального id и минимального). Итого получаем случайное число умноженное на 0 или на 400. Но нам нужно чтобы минимум был 1011000. Поэтому тупо прибавляем к результату.
    getCharacter(id).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  const descr = () => {
    if (!description) {
      return "No description";
    } else {
      return description.slice(0, 145).endsWith(".")
        ? description.slice(0, 145) + ".."
        : description.slice(0, 145) + "...";
    }
  };

  let imgClass = "randomchar__img";

  if (thumbnail && thumbnail.includes("not_available")) {
    imgClass += " contain";
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={imgClass} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr()}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
