import * as React from "react";
import { Suggestion } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";
import { CaretCoordinates } from "../util/TextAreaCaretPosition";

export interface SuggestionsDropdownProps {
  classes?: ClassValue;
  caret: CaretCoordinates;
  suggestions: Suggestion[];
  placeholder?: React.ReactNode;
  suggestionsAutoplace: boolean;
  onSuggestionSelected: (index: number) => void;
  /**
   * Which item is focused by the keyboard
   */
  focusIndex: number;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const SuggestionsDropdown: React.FunctionComponent<
  SuggestionsDropdownProps
> = ({
  classes,
  suggestions,
  caret,
  onSuggestionSelected,
  suggestionsAutoplace,
  focusIndex,
  textAreaRef,
  placeholder
}) => {
  if (!suggestions.length && !placeholder) {
    return null;
  }
  const handleSuggestionClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const index = parseInt(event.currentTarget.attributes["data-index"].value);
    onSuggestionSelected(index);
  };

  const handleMouseDown = (event: React.MouseEvent) => event.preventDefault();

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const left = caret.left - textAreaRef.current.scrollLeft;
  const top = caret.top - textAreaRef.current.scrollTop;

  const style: React.CSSProperties = {};
  if (
    suggestionsAutoplace &&
    top + textAreaRef.current.getBoundingClientRect().top > vh / 2
  )
    style.bottom = textAreaRef.current.offsetHeight - top;
  else style.top = top;

  if (
    suggestionsAutoplace &&
    left + textAreaRef.current.getBoundingClientRect().left > vw / 2
  )
    style.right = textAreaRef.current.offsetWidth - left;
  else style.left = left;

  if (!suggestions.length) {
    return (
      <ul className={classNames("mde-suggestions", classes)} style={style}>
        <li className="mde-loading-placeholder">{placeholder}</li>
      </ul>
    );
  }

  return (
    <ul className={classNames("mde-suggestions", classes)} style={style}>
      {suggestions.map((s, i) => (
        <li
          onClick={handleSuggestionClick}
          onMouseDown={handleMouseDown}
          key={i}
          aria-selected={focusIndex === i ? "true" : "false"}
          data-index={`${i}`}
        >
          {s.preview}
        </li>
      ))}
    </ul>
  );
};
