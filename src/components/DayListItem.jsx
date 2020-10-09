import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  function formatSpots(spots) {
    let formatedSpot = "no spots remaining";
    if (spots === 1) {
      formatedSpot = "1 spot remaining";
    }
    if (spots > 1) {
      formatedSpot = spots + " spots remaining";
    }
    return formatedSpot;
  }
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => setDay(name)}
      selected
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

export default DayListItem;
