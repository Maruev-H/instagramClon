import React, { useState } from "react";

interface ReadMore {
  children: string;
  len: number;
}

const  ReadMore:React.FC<ReadMore> = ({ children, len }) => {
  
  const [isReadMore, setIsReadMore] = useState(false);

  const readMoreBtn = () => {
    setIsReadMore(!isReadMore);
  };

  if(children.length < len){
    return <span>{children}</span>
  }

  return (
    <>
      <span>{isReadMore ? children : `${children.substring(0, len)}...`}</span>
      <div>
        <p onClick={readMoreBtn} className="ReadMore">
          {isReadMore ? "less" : "more..."}
        </p>
      </div>
    </>
  );
}

export default ReadMore;
