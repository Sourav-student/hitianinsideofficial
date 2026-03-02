import React, { useState, useEffect } from "react";
import AlmanacSkeleton from "../../components/Almanac/AlmanacSkeleton";
import AlmanacHeader from "../../components/Almanac/AlmanacHeader";
import BestOfAlmanac from "../../components/Almanac/BestOfAlmanac";

function Almanac() {
  const [loadingPage, setLoadingPage] = useState(true);

  //Loading page
  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
  }, [])

  if (loadingPage) {
    return (
      <>
        <AlmanacSkeleton />
      </>
    )
  }

  return (
    <div className="bg-[#650808] min-h-screen w-full overflow-hidden">
      {/* ========== Almanac Header Section ========== */}
      <AlmanacHeader/>

      {/* ========== Best of Almanac Section ========== */}
      <BestOfAlmanac/>
    </div>

  );
}

export default Almanac;