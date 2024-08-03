import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../db/Firebase/firebase";
import { Auth } from "../../Providers/AuthProvider";
import { GetUser } from "../../UseHooks";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  const { currentUser } = useContext(Auth);
  const [id, setID] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    setID(currentUser?.uid);
  }, [currentUser?.uid]);

  const { data: userInfo, isLoading, isError, error } = GetUser(id);
  const date = userInfo?.memberSince.toDate();

  const signout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };
  if (isError) return <h1>{error.message}</h1>;
  if (isLoading || !userInfo) {
    return (
      <div className=" h-[100svh] gap-4 relative sm:flex hidden flex-col w-full sm:w-80 justify-start ">
        <div className=" flex flex-col gap-4 w-72">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex flex-col gap-4 w-72">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }
  if (isError)
    return (
      <div className="user-info">
        <h1>{error.message}</h1>
      </div>
    );
  return (
    <div className="relative md:flex hidden  flex-col w-full md:w-80 justify-start  h-[100svh]">
      <div className="relative w-full h-56">
        <img
          src={userInfo?.coverURL}
          alt=" cover image"
          className="absolute h-full w-full object-cover"
        />
        
      </div>
      <div className="-mt-12 pl-2 flex flex-wrap gap-2  items-end ">
        <div className="avatar ">
          <div className="w-32 rounded-full">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{userInfo?.displayName}</h1>
          <h3 className="text-lg font-semibold">{userInfo?.email}</h3>
          <span className="text-md font-semibold">
            Member since {date.getMonth() + 1},{date.getFullYear()}
          </span>
        </div>
      </div>

      <div className="collapse bg-base-200 my-2 ">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          {userInfo?.about.substring(0, 10)}...
        </div>
        <div className="collapse-content">
          <p>{userInfo?.about}</p>
        </div>
      </div>
      <div className="relative mt-2 flex justify-around gap-4items-center">
        <button
          className="btn w-[45%] btn-sm  btn-error rounded-full"
          onClick={signout}
        >
          SignOut
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
