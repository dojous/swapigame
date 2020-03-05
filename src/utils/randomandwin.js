import _ from "lodash";

const compareProps = {
  species: "average_height",
  people: "mass",
  starships: "crew",
  vehicles: "crew",
  planets: "diameter",
  films: "episode_id"
};

export const winnerCard = (data, selectedResource) => {
  const [first, second] = _.sampleSize(data, 2);
  const compareProp = compareProps[selectedResource];
  if (!compareProp) {
    return [first, second];
  }

  if (
    isNaN(parseInt(_.get(first, compareProp, 0))) ||
    isNaN(parseInt(_.get(second, compareProp, 0))) ||
    parseInt(_.get(first, compareProp, 0)) ===
      parseInt(_.get(second, compareProp, 0))
  ) {
    return [{ ...first }, { ...second }];
  } else {
    const first_win =
      parseInt(_.get(first, compareProp, 0)) >
      parseInt(_.get(second, compareProp, 0));

    return [
      { ...first, win: first_win },
      { ...second, win: !first_win }
    ];
  }
};
