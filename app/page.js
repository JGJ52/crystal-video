"use client"
import Navbar from "@/app/navbar/navbar";
import Home from "@/app/home";
import {useState} from "react";

export default function Main() {
    const [View, setView] = useState(() => Home);

    return (
      <>
          <Navbar view={View} setView={setView} />
          <View />
      </>
    );
}
