import styles from "./TippyWrapper.module.scss"
import { ReactNode, useEffect, useRef } from "react";
import tippy from "tippy.js";

interface IProps {
  children: ReactNode,
  content: string | Element,
}

function TippyWrapper({ children, content }: IProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tippy(mainRef.current as HTMLElement, {
      content: content
    })
  })

  return (
    <div ref={mainRef} className={styles.tippyWrapper}>

    </div>
  )
}

export default TippyWrapper;
