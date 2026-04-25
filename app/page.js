import {ToastContainer} from "react-toastify";
import Uploaders from "@/app/uploaders/uploaders";

export default function Main() {
    return (
      <>
          <Uploaders />
          <ToastContainer theme={"dark"} position={"bottom-right"} />
      </>
    );
}
