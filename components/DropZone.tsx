"use client";

import React from "react";
import DropZoneComponent from "react-dropzone";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc } from "firebase/firestore/lite";

function DropZone() {
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
  const maxSize = 20971520;

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (file: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fullName: user.fullName,
      profileImage: user.imageUrl,
      fileName: file.name,
      size: file.size,
      type: file.type,
      createdAt: serverTimestamp(),
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL,
      });
    });

    setLoading(false);
  };

  return (
    <DropZoneComponent
      onDrop={(acceptedFiles) => {
        onDrop(acceptedFiles);
      }}
      maxSize={maxSize}
      minSize={0}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-32 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md cursor-pointer",
                isDragActive
                  ? "border-green-600"
                  : isDragReject
                  ? "border-red-600"
                  : "border-gray-300"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && "File is too large!"}
            </div>
          </section>
        );
      }}
    </DropZoneComponent>
  );
}

export default DropZone;
