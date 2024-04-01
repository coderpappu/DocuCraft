import React from "react";
import ContentDisplay from "@/components/ContentDisplay";
const SubContentPage = ({ params: { subContentId } }) => {
  return (
    <ddiv>
      <ContentDisplay id={subContentId} />
    </ddiv>
  );
};

export default SubContentPage;
