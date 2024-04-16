import styles from "./HighlightedText.module.scss";
import { useSearchContext } from "context/SearchContext";

interface IProps {
  text: string;
  className: string;
}

const HighlightedText = ({ text, className }: IProps) => {
  const { keyword } = useSearchContext();

  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <span key={index}>{part}</span> : part
    );
  };

  return (
    <p className={`${styles.highlightedText} ${className}`}>{ highlightText(text, keyword) }</p>
  );
};

export default HighlightedText;