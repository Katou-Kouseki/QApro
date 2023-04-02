import styles from "./recomment.module.scss";
import { OFFICIAL_ACCOUNT_LINK } from "../constant";

interface Props {
  fontSize?: number;
}
export default function Recomment({ fontSize }: Props) {
  return (
    <div className={styles["sider-recomment"]}>
      <img src={OFFICIAL_ACCOUNT_LINK} />
      <div style={{ fontSize: `${fontSize}px` }}>
        扫码关注公众号
        <br />
        获取最新<strong>授权码</strong> <br /> 以及最新域名～
      </div>
    </div>
  );
}
