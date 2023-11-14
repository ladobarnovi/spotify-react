import styles from "./CardsRow.module.scss";
import EntityCard, { ICardOptions } from "components/EntityCard/EntityCard";
import { IEntityBase } from "types/entityBase";
import { useResize } from "hooks/useResize";
import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  title: string;
  arrData: IEntityBase[];
  url?: string;
  options?: ICardOptions;
  children?: ReactNode;
}

function CardsRow({ title, url, arrData, options, children }: IProps) {
  const [ numCards, setNumCards ] = useState(0);
  const { addOnResize } = useResize();
  const refRow = useRef<HTMLDivElement>(null);

  function onResize() {
    const el = refRow.current;
    if (el == null) {
      return;
    }

    let num = 2;
    const width = el.clientWidth;

    const arrSizes = [
      { width: 1800, num: 9 },
      { width: 1560, num: 8 },
      { width: 1356, num: 7 },
      { width: 1152, num: 6 },
      { width: 948, num: 5 },
      { width: 700, num: 4 },
      { width: 450, num: 3 },
    ];

    for (let i = 0; i < arrSizes.length; i++) {
      if (width > arrSizes[i].width) {
        num = arrSizes[i].num;
        break;
      }
    }

    setNumCards(num);
    el.style.cssText = `--card-count: ${num}`;
  }

  useEffect(() => {
    const destructor = addOnResize(onResize);
    onResize();
    return () => destructor();
  }, [ ]);

  const elEntityCards = arrData
    .slice(0, numCards)
    .map((entity) => (
      <EntityCard key={entity.id} data={entity} options={options} />
    ));

  const elShowMore = url != null && numCards < arrData.length ? (
    <NavLink to={url}>Show all</NavLink>
  ) : null;

  return (
    <div ref={refRow} className={styles.cardsRow}>
      <header>
        <p className={styles.title}>{title}</p>
        { elShowMore }
      </header>

      { children }

      <div className={styles.cards}>
        { elEntityCards }
      </div>
    </div>
  )
}

export default CardsRow;
