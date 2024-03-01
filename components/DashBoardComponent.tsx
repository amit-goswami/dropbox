"use client";

import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function DashBoardComponent({ userId }: { userId: string | null }) {
  const [skeletonFiles, setSkeletonFiles] = React.useState<any[] | null>(null);

  (async function () {
    const docResults = await getDocs(collection(db, "users", userId!, "files"));
    const skeletonFiless: any[] = docResults.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSkeletonFiles(skeletonFiless);
  })();

  if (!skeletonFiles) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <h2>Your Files</h2>
      <ul>
        {skeletonFiles &&
          skeletonFiles.map((file) => {
            return (
              <li key={file.id}>
                <p>{file.fileName}</p>
                <p>{file.size}</p>
                <p>{file.type}</p>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default DashBoardComponent;
