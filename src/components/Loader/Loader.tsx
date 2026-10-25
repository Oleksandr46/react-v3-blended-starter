import style from "./Loader.module.css";
import { BeatLoader } from "react-spinners";



export default function Loader() {
  return <div className={style.backdrop}><BeatLoader color="#36d7b7" /></div>;
}
