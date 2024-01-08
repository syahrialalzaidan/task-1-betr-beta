"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth();

  React.useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Assuming you have already initialized `auth` using `getAuth`
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleForm = async () => {
    const data = {
      name: "John snow",
      house: "Stark",
    };
    const { result, error } = await addData("users", "user-id", data);

    if (error) {
      return console.log(error);
    }
    window.alert("Data added successfully");
    console.log(result);
  };

  return (
    <div className="bg-blue-100 flex flex-col w-full justify-center items-center min-h-screen">
      <h1>Welcome to this Home Page</h1>
      <p>Only Registered Acoount can come here</p>

      <div className="flex gap-24 items-center">
        <div className="flex flex-col items-center">
          <p className="mt-4">Try to add data?</p>
          <button className="bg-green-500 mt-4 px-2 py-2 rounded-lg text-white font-bold" onClick={handleForm}>
            Add Data
          </button>
        </div>

        <button
          className="bg-red-500 mt-4 px-2 py-2 rounded-lg text-white font-bold h-1/2"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Page;
