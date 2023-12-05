import styles from "./CardsRow.module.scss";
import EntityCard, { ICardOptions } from "components/EntityCard/EntityCard";
import { IEntityBase } from "types/entityBase";
import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import ResponsiveGridWrapper from "components/ResponsiveGridWrapper/ResponsiveGridWrapper";

interface IProps {
  title: string;
  arrData: IEntityBase[];
  url?: string;
  options?: ICardOptions;
  children?: ReactNode;
}

function CardsRow({ title, url, arrData, options, children }: IProps) {
  const [ numCards, setNumCards ] = useState(0);

  const elEntityCards = arrData
    .slice(0, numCards)
    .map((entity) => (
      <EntityCard key={entity.id} data={entity} options={options} />
    ));

  const elShowMore = url != null && numCards < arrData.length ? (
    <NavLink to={url}>Show all</NavLink>
  ) : null;

  return (
    <div className={styles.cardsRow}>
      <header>
        <p className={styles.title}>{title}</p>
        { elShowMore }
      </header>

      { children }

      <ResponsiveGridWrapper onColCountChanged={setNumCards}>
        { elEntityCards }
      </ResponsiveGridWrapper>
    </div>
  )
}

export default CardsRow;
