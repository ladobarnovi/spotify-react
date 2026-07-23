import styles from "./EntityHeaderTitle.module.scss";

interface IProps {
  title: string;
  onClick?: () => void;
}

function EntityHeaderTitle({ title, onClick }: IProps) {
  const titleClass = (() => {
    if (title.length >= 14) {
      return styles.small;
    }
    else if (title.length >= 10) {
      return styles.medium;
    }

    return "";
  })()

  return (
    <div onClick={onClick} className={`${styles.entityHeaderTitle} ${titleClass}`}>{ title }</div>
  );
}

export default EntityHeaderTitle;
